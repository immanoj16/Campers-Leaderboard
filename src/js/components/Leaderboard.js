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
    }

    fetchData () {

        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
            .then(response => response.json())
            .then(parsedJson => parsedJson.map((camper, id) => (
                {
                    id: id + 1,
                    username: `${camper.username}`,
                    img: `${camper.img}`,
                    recent: `${camper.recent}`,
                    alltime: `${camper.alltime}`
                }
            )))
            .then(campers => this.setState({
                campers,
            }))
            .catch(error => console.log("Parsing Failed ", error))
    }

    render () {
        const { campers, id } = this.state;
        console.log(campers.length);
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
                                const { id, username, img, recent, alltime } = camper;
                                return (
                                    <tr key={username}>
                                        <td style={{textAlign: 'left'}} scope="row">{id}</td>
                                        <td style={{textAlign: 'left'}}><a href={`https://www.freecodecamp.com/${username}`} target="_blank"><img src={img} /><span>{username}</span></a></td>
                                        <td>{recent}</td>
                                        <td>{alltime}</td>
                                    </tr>
                                )
                            }) : null
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Leaderboard;
