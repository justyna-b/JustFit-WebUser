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
      activityId: '',
      activityToSignUp: '',
      weekActivities: [],
      myExercises: [],
      labels: [],
      loading: true
    }
    this.Auth = new AuthService()
  }

  formatDate (begining) {
    var dd = String(begining.getDate()).padStart(2, '0')
    var mm = String(begining.getMonth() + 1).padStart(2, '0')
    var yyyy = begining.getFullYear()

    return dd + '.' + mm + '.' + yyyy
  }

  prepareLabel (date) {
    var dayOfWeek = date.getDay()
    var label = [
      'Niedziela',
      'Poniedziałek',
      'Wtorek',
      'Środa',
      'Czwartek',
      'Piątek',
      'Sobota'
    ]
    return label[dayOfWeek]
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

    var begining = new Date()
    var dd = String(begining.getDate()).padStart(2, '0')
    var mm = String(begining.getMonth()).padStart(2, '0')
    var yyyy = begining.getFullYear()
    var begining = new Date(yyyy, mm, dd)

    // console.log(begining)
    for (var i = 0; i < 7; i++) {
      const nextDay = new Date(begining)
      nextDay.setDate(nextDay.getDate() + i)
      console.log(nextDay)
      this.setState({
        labels: [...this.state.labels, this.prepareLabel(nextDay)]
      })
      await this.Auth.fetch(
        `https://planowanie-zajec.herokuapp.com/getActivitiesByDate/${this.formatDate(
          nextDay
        )}`
      ).then(res => {
        this.setState({ weekActivities: [...this.state.weekActivities, res] })
      })
    }

    await this.Auth.fetch(
      'https://justfitclient.pythonanywhere.com/api/activity/'
    )
      .then(res => {
        var temp = []
        res.map(exercise => temp.push(exercise.id_activity))
        this.setState({
          myExercises: temp
        })

        console.log(this.state.myExercises)
      })
      .then(this.setState({ loading: false }))
  }

  getOffer = (day, offerId) => {
    this.setState(
      { activityToSignUp: this.state.weekActivities[day][offerId].id },
      () => {
        console.log('this.state.activityToSignUp')
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
              {this.state.weekActivities.map((day, i) => (
                <div className='day-scheduler-container'>
                  <h3>{this.state.labels[i]}</h3>
                  {day.map((activity, index) => (
                    <div className='main-activity-container'>
                      <p>{activity.leader}</p>
                      <p
                        style={{
                          fontWeight: 'bold',
                          textTransform: 'uppercase'
                        }}
                      >
                        {activity.activityType}
                      </p>
                      <p>
                        {activity.hourStart} - {activity.hourEnd}
                      </p>
                      <p>{activity.classCanceled}</p>
                      {this.state.myExercises.includes(activity.id) === true ? (
                        <div className='button-container'>
                          <button className='enrolled-button' disabled={true}>
                            zapisany
                          </button>
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
                              ({ activity }, () => this.getOffer(i, index))
                            }
                            activityToSignUp={this.state.activityToSignUp}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
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
