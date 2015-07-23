import React from 'react';
import ClickMe from './ClickMe';

// TODO: find out a way to require module-specific less file
// which will work for server rendering
// require('!style!css!less!./less/home.less')

class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-danger text-center">
                <h2 className="text-primary">HOME PAGE</h2>
                <div className="home-clickme">
                    <ClickMe />
                </div>
            </div>
        );
    }
}

export default Home;
