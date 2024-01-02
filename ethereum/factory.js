import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  "0xD133f2a6b1F24FEb411A05ae73d7A4584632cA07" // OLD ADDRESS, CHANGE IT
);

export default instance;
