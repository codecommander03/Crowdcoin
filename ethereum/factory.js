import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    "0xD133f2a6b1F24FEb411A05ae73d7A4584632cA07"
);

export default instance;