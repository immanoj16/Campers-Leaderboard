import React, { Component } from 'react';

class Leaderboard extends Component {

    constructor (props) {
        super(props);

        this.state = {
            campers: [],
            allTimeCampers: [],
            recent: true,
            alltime: false
        }
        this.recentCampers = this.recentCampers.bind(this);
        this.allTimeCampersList = this.allTimeCampersList.bind(this);
    }

    componentDidMount () {
        this.fetchData();
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

    allTimeFetch () {

        fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
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
            .then(allTimeCampers => this.setState({
                allTimeCampers,
            }))
            .catch(error => console.log("Parsing Failed ", error))
    }

    recentCampers () {
        this.setState({
            recent: true,
            alltime: false
        })

        this.fetchData();
    }

    allTimeCampersList () {
        this.setState({
            recent:false,
            alltime: true
        })

        this.allTimeFetch();
    }

    render () {
        const { campers, allTimeCampers, recent, alltime } = this.state;
        console.log(allTimeCampers);
        return (
            <div className="col-md-12">
                <h3>Leaderboard</h3>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{textAlign: 'left'}}>#</th>
                            <th style={{textAlign: 'left'}}>Camper Name</th>
                            <th className="camper"><span onClick={() => this.recentCampers()}>Points in past 30 days{recent && campers.length > 0 ? <span className="glyphicon glyphicon-triangle-bottom" /> : null}</span></th>
                            <th className="camper"><span onClick={() => this.allTimeCampersList()}>All time points{alltime && allTimeCampers.length > 0 ? <span className="glyphicon glyphicon-triangle-bottom" /> : null}</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            recent && campers.length > 0 ? campers.map(camper => {
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

                        {
                            alltime && allTimeCampers.length > 0 ? allTimeCampers.map(camper => {
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
