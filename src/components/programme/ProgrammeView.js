import React from 'react'
import AuthService from '../logging/AuthService'
import { Redirect } from 'react-router-dom'
import HeaderPanel from '../navigation/HeaderPanel.js'
import Footer from '../home/Footer.js'
import '../../styles/ProgrammeView.css'
import { Link } from 'react-router-dom'
import ConfirmAlert from '../ConfirmAlert.js'
import LoadingScreen from 'react-loading-screen'


class ProgrammeView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      auth: true,
      name: '',
      surname: '',
      email: '',
      id: '',
      activitiesMonday: [],
      activitiesTuesday: [],
      activitiesWednesday: [],
      activitiesThursday: [],
      activitiesFriday: [],
      activitiesSaturday: [],
      activitiesSunday: [],
      activityId: '',
      activityToSignUp: '',
      activities: [],
      myExercises: [],
      loading: true
    }
    this.Auth = new AuthService()
  }

  async componentDidMount () {
    if (this.Auth.loggedIn()) {
      await this.Auth.fetch(
        'https://justfitclient.pythonanywhere.com/account/client/properties/'
      )
        .then(res => {
          this.setState({
            name: res.first_name,
            surname: res.last_name,
            email: res.email,
            phoneNumber: res.phone_number,
            id: res.id
          })
        })
        .catch(error => {
          console.log({ message: 'ERROR ' + error })
        })
    } else {
      this.setState({ auth: false })
    }

    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/01.06.2020'
    ).then(res => {
      this.setState({
        activitiesMonday: res
      })
    })
    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/02.06.2020'
    ).then(res => {
      this.setState({
        activitiesTuesday: res
      })
    })
    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/03.06.2020'
    ).then(res => {
      this.setState({
        activitiesWednesday: res
      })
    })
    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/04.06.2020'
    ).then(res => {
      this.setState({
        activitiesThursday: res
      })
    })
    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/05.06.2020'
    ).then(res => {
      this.setState({
        activitiesFriday: res
      })
    })
    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/06.06.2020'
    ).then(res => {
      this.setState({
        activitiesSaturday: res
      })
    })
    await this.Auth.fetch(
      'https://planowanie-zajec.herokuapp.com/getActivitiesByDate/07.06.2020'
    ).then(res => {
      this.setState({
        activitiesSunday: res
      })
    })
    await this.Auth.fetch(
      'https://justfitclient.pythonanywhere.com/api/exercise/'
    )
    .then(res => {
      var temp = []
      res.map(exercise => temp.push(exercise.id_exercise))
      this.setState({
        myExercises: temp
      })
     
      console.log(this.state.myExercises)
    })
     .then(this.setState({ loading: false }))
  }

  getOfferMonday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesMonday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }
  getOfferTuesday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesTuesday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }
  getOfferWednesday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesWednesday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }
  getOfferThursday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesThursday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }
  getOfferFriday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesFriday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }
  getOfferSaturday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesSaturday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }

  getOfferSunday = offerId => {
    this.setState(
      { activityToSignUp: this.state.activitiesSunday[offerId].id },
      () => {
        console.log(this.state.activityToSignUp)
      }
    )
  }

  render () {
    return (
      <LoadingScreen
        loading={this.state.loading}
        bgColor='grey'
        spinnerColor='orange'
        textColor='orange'
        text='Zmieniaj się z nami'
      >
      <div className='App'>
        {this.state.auth ? '' : <Redirect to='/login' />}
        <header>
          <HeaderPanel />
        </header>
        <body className='App-Body'>
          <div className='main-scheduler-container'>
            <div className='day-scheduler-container'>
              <h3>Poniedziałek</h3>
              {this.state.activitiesMonday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                  {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferMonday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='day-scheduler-container'>
              <h3>Wtorek</h3>
              {this.state.activitiesTuesday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                 {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferTuesday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='day-scheduler-container'>
              <h3>Środa</h3>
              {this.state.activitiesWednesday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                 {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferWednesday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='day-scheduler-container'>
              <h3>Czwartek</h3>
              {this.state.activitiesThursday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                 {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferThursday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='day-scheduler-container'>
              <h3>Piątek</h3>
              {this.state.activitiesFriday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                 {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferFriday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='day-scheduler-container'>
              <h3>Sobota</h3>
              {this.state.activitiesSunday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferSaturday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className='day-scheduler-container'>
              <h3>Niedziela</h3>
              {this.state.activitiesSunday.map((activity, index) => (
                <div className='main-activity-container'>
                  <p>{activity.leader}</p>
                  <p style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {activity.activityType}
                  </p>
                  <p>
                    {activity.hourStart} - {activity.hourEnd}
                  </p>
                  <p>{activity.classCanceled}</p>
                 {this.state.myExercises.includes(activity.id) === true ? (
                    <div className='button-container'>
                      <button className='enrolled-button' disabled={true}>zapisany</button>
                    </div>
                  ) : (
                    <div className='button-container'>
                      <ConfirmAlert
                        textA={activity.name}
                        date={activity.date}
                        activityId={activity.id}
                        hourStart={activity.hourStart}
                        hourEnd={activity.hourEnd}
                        id={this.state.id}
                        exercises={this.state.exercises}
                        onClick={
                          ({ activity }, () => this.getOfferSunday(index))
                        }
                        activityToSignUp={this.state.activityToSignUp}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </body>
        <footer style={{ backgroundColor: 'black' }}>
          <Footer />
        </footer>
      </div>
      </LoadingScreen>
    )
  }
}

export default ProgrammeView
