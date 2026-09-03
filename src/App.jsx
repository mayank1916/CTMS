// import { useState } from 'react'
// import Login from './pages/Authentication/login'
// import Signup from './pages/Authentication/signup'

import InvestigatorDashboard from './pages/Investigator/InvestigatorDashboard'
import StudyCoordinator from './pages/StudyCoordinator/StudyCoordinator'
import EthicsCommittee from './pages/EthicsCommittee/EthicsCommittee'
import Pharmacovigilance from './pages/Pharmacovigilance/Pharmacovigilance'


function App() {

  // const [showLogin, setShowLogin] = useState(true)

  // const handleLogin = (user) => {
  //   console.log('Logged in user:', user)

  //   localStorage.setItem(
  //     'currentUser',
  //     JSON.stringify(user)
  //   )

  //   alert(`Welcome ${user.name}!`)
  // }

  // const handleSignup = (user) => {
  //   console.log('New user:', user)

  //   const existingUsers =
  //     JSON.parse(localStorage.getItem('users')) || []

  //   const userExists = existingUsers.some(
  //     (existingUser) =>
  //       existingUser.email.toLowerCase() ===
  //       user.email.toLowerCase()
  //   )

  //   if (userExists) {
  //     return {
  //       success: false,
  //       message: 'An account with this email already exists.',
  //     }
  //   }

  //   existingUsers.push(user)

  //   localStorage.setItem(
  //     'users',
  //     JSON.stringify(existingUsers)
  //   )

  //   return {
  //     success: true,
  //     message: 'Account created successfully!',
  //   }
  // }


  return (
    <>
      {/* <InvestigatorDashboard /> */}

      {/* <StudyCoordinator /> */}

      {/* <EthicsCommittee /> */}
      <Pharmacovigilance />
      
    </>
  )
}

export default App