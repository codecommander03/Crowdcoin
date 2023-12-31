import React, { Component } from "react";
import Factory from "../ethereum/factory";

class CampaignIndex extends Component {
    async componentDidMount() {
        const campaigns = await Factory.methods.getDeployedCampaigns().call();
        console.log(campaigns);
    }

    render() {
        return <div>Campaigns Index!</div>;
    }
}

export default CampaignIndex;