import React, { Component } from 'react';

class Leaderboard extends Component {

    constructor (props) {
        super(props);

        this.state = {
            campers: []
        }
    }

    componentDidMount () {

        this.fetchData()
        console.log(this.state.campers);
    }

    fetchData () {

        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(response => response.json())
            .then(parsedJson => console.log(parsedJson))
            .catch(error => console.log("Parsing Failed ", error))
    }

    render () {
        const {campers} = this.state;
        return (
            <div className="col-md-10 col-md-offset-1">
                <h3>Leaderboard</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>#</th>
                            <th style={{textAlign: 'left'}}>Camper Name</th>
                            <th>Points in past 30 days</th>
                            <th>All time points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            campers.length > 0 ? campers.map(camper => {
                                const {username, img, recent, alltime} = camper;
                                <tr>
                                    <td style={{textAlign: 'left'}} scope="row">1</td>
                                    <td style={{textAlign: 'left'}}>{username}</td>
                                    <td>{recent}</td>
                                    <td>{alltime}</td>
                                </tr>
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Leaderboard;
