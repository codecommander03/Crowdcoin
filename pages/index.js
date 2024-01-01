import React, { Component } from "react";
import { Card, Button } from "semantic-ui-react";
import Factory from "../ethereum/factory";

class CampaignIndex extends Component {
    static async getInitialProps() {
        const campaigns = await Factory.methods.getDeployedCampaigns().call();
        return { campaigns };
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <a>View Campaign</a>,
                fluid: true
            };
        });

        return <Card.Group items={items} />;
    }

    render() {
        return <div>
            <h2>Open Campaigns</h2>
            <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.3/semantic.min.css"></link>
            {this.renderCampaigns()}
            <Button
                content="Create Campaign"
                icon="add circle"
                primary
            />
        </div>;
    }
}

export default CampaignIndex;