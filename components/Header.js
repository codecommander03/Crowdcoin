import React from 'react'
import { Menu } from 'semantic-ui-react'
import  Link from "next/link";

const Header = () => {
    return (
    <Menu style={{marginTop: '10px'}}>
        <Link href="/">
            <Menu.Item>Kickstarter</Menu.Item>
        </Link>
    
        <Menu.Menu position='right'>
            <Link href="/">
                <Menu.Item>Campaigns</Menu.Item>
            </Link>
                
            <Link href="/campaigns/new">
            <Menu.Item>+</Menu.Item>
            </Link>
        </Menu.Menu>
    </Menu>
    )
}

export default Header