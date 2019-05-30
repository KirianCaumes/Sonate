import React, { Component } from 'react'
import { Columns, Card, Container, Table, Loader } from 'react-bulma-components'
import Request from '../helpers/request'
import Layout from '../components/layout'

export default class History extends Component {
    constructor(props) {
        super(props)
        document.title = "Sonate ♪ Highscore"
        this.state = {
            rows: [{}],
            loading: true
        }
    }

    componentDidMount() {
        Request.send('GET', ['scores', 'history'], {},
            (data) => {
                this.setState({ rows: data, loading: false })
            })
    }

    render() {
        return (
            <Layout>
                <Container>
                    <Columns>
                        <Columns.Column>
                            <Card>
                                <Card.Header>
                                    <Card.Header.Title>Découvrez les dernières parties de Sonate !</Card.Header.Title>
                                </Card.Header>
                                <Card.Content style={{ padding: '1.5rem 0' }}>
                                    {
                                        this.state.loading
                                            ?
                                            <Loader style={{ width: 50, height: 50, margin: '0 auto' }} />
                                            :
                                            this.state.rows && this.state.rows.length
                                                ?
                                                <Table className="table is-striped is-hoverable is-fullwidth">
                                                    <thead>
                                                        <tr>
                                                            <th>Date</th>
                                                            <th>Joueur</th>
                                                            <th>Niveau</th>
                                                            <th><abbr title="Temps restant">Temps</abbr></th>
                                                            <th>Chansons</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.rows.map((row, i) => {
                                                            let d = new Date(row.date)
                                                            return (
                                                                <tr key={row._id}>
                                                                    <td>
                                                                        {[d.getDate(), d.getMonth() + 1, d.getFullYear()].map(n => n < 10 ? `0${n}` : `${n}`).join('/')} à {[d.getHours(), d.getMinutes() + 1, d.getSeconds()].map(n => n < 10 ? `0${n}` : `${n}`).join(':')}
                                                                    </td>
                                                                    <td>{row.username}</td>
                                                                    <td>{row.level.charAt(0).toUpperCase() + row.level.slice(1)}</td>
                                                                    <td>{new Date(row.time * 1000).toISOString().substr(11, 8)}</td>
                                                                    <td>{row.songs.found}/{row.songs.total}</td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </Table>
                                                :
                                                <p style={{ padding: '2em', textAlign: "center" }}>Il n'y a aucune partie pour le moment...</p>
                                    }
                                </Card.Content>
                            </Card>
                        </Columns.Column>
                    </Columns>
                </Container>
            </Layout>
        )
    }
}
