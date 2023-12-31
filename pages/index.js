import React, { Component } from "react";
import Factory from "../ethereum/factory";

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await Factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    render() {
        return <div>{ this.props.campaigns }</div>;
    }
}

export default CampaignIndex;