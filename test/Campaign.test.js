const assert = require('assert');
const ganache = require('ganache'); // local test network
const { Web3 } = require('web3'); // constructor function
const web3 = new Web3(ganache.provider()); // instance of web3

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts; // list of unlocked accounts
let factory; // reference to deployed instance of factory
let campaignAddress;
let campaign;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts(); // get list of accounts
    // deploy a new instance of the factory
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: compiledFactory.bytecode })
        .send({ 
            from: accounts[0], 
            gas: '1000000' 
        });
    
    // create a new campaign
    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    // get the address of the first campaign
    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    // create a javascript representation of the contract
    campaign = await new web3.eth.Contract(
        JSON.parse(compiledCampaign.interface),
        campaignAddress
    );
});

describe('Campaigns', () => {
    // check if the factory and campaign are deployed
    it('deploys a factory and a campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    // check if the caller is the manager
    it('marks caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });
    // check if the caller is a contributor
    it('allows people to contribute money and marks them as approvers', async () => {
        await campaign.methods.contribute().send({
            value: '200', 
            from: accounts[1]
        });
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });
    // check if the minimum contribution is met
    it('requires a minimum contribution', async () => {
        try {
            await campaign.methods.contribute().send({
                value: '5', 
                from: accounts[1]
            });
            assert(false); // if the above line of code runs, the test fails
        } catch (err) {
            assert(err);
        }
    });
    // check if the manager can make a payment request
    it('allows a manager to make a payment request', async () => {
        await campaign.methods
            .createRequest('Buy batteries', '100', accounts[1])
            .send({ 
                from: accounts[0], 
                gas: '1000000' 
            });
        const request = await campaign.methods.requests(0).call();
        assert.equal('Buy batteries', request.description);
    });
    // check if a contributor can approve a payment request
    it('processes requests', async () => {
        // contribute to the campaign
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });
        // create a request
        await campaign.methods
            .createRequest('A', web3.utils.toWei('5', 'ether'), accounts[1])
            .send({ 
                from: accounts[0], 
                gas: '1000000' 
            });
        // approve the request
        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });
// finalize the request
        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });
// get the balance of the recipient
        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, 'ether');
        balance = parseFloat(balance); // convert string to float
        console.log(balance);
        assert(balance > 104);
    }
    );
}
);
