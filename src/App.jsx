import { useState } from 'react'

function App() {
  const [homeSelected, setHomeSelected] = useState(true)
  const [loginSelected, setLoginSelected] = useState(false)
  const [signUpSelected, setSignUpSelected] = useState(false)
  const [appliancesSelected, setAppliancesSelected] = useState(false)
  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredPassword, setEnteredPassword] = useState('')
  const [loginUsername, SetLoginUsername] = useState('')
  const [loginPassword, SetLoginPassword] = useState('')
  const [loggedUser, setLoggedUser]= useState([])
  const [token, setToken] = useState('')
  const [appliancesList, setAppliancesList] = useState([])
  const [applianceDetails, setApplianceDetails] = useState([])
  //Sign up function// Create on server.cjs an end point '/api/v1/users' accepting get request
  const signUp = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/v1/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: enteredUsername,
        password: enteredPassword
      })
    })
    const result = await response.json()
    console.log(result)

  }
  //Login function// -> PleaseCreate on server.cjs '/api/v1/users/login' accepting POST request
  //  and send send a token to the FE
  const login = async (event) => {
    event.preventDefault()
    const response = await fetch('/api/v1/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: loginUsername,
        password: loginPassword
      })
    });
    const tokenObj = await response.json()
    console.log(tokenObj.token)
    setToken(tokenObj.token)
    localStorage.setItem("token", tokenObj.token)
  }
  /* Function to get the list of appliances from the DB and return.
  the return is rendered in the webpage*/ 
  const getAppliancesList = async () => {
    const response = await fetch('/api/v1/appliances');
    const result = await response / json()
    console.log(result)
    setAppliancesList(result)
  }

   /* Function to get the details of a selected appliance from the DB by appliance_id and return the details.
  the return is rendered in the webpage */ 
  const getApplianceDetails = async (applianceId) => {
    const response = await fetch (`/api/v1/appliances/${applianceId}`);
    const result = await response/json()
    console.log(result)
    setAppliancesSelected(false)
    setApplianceDetails(result)
  }

  const getLoggedUser = async (token) => {
    const response = await fetch (`/api/v1/user/${token}`);
    const result = await response.json();
    setLoggedUser(result) 
  }

  const logOut = async () => {
    setToken('');
    localStorage.removeItem("token")
  }
  return (
    //Nav bar and event handlers to set conditions to display selected pages
    <>
      <nav className="navbar">
        <h3 onClick={() => { setHomeSelected(true); setLoginSelected(false); setSignUpSelected(false); setAppliancesSelected(false) }}>
          <a>Home</a></h3>
         
        <h3 onClick={() => { setHomeSelected(false); setLoginSelected(false); setSignUpSelected(true); setAppliancesSelected(false) }}>
          <a>Sign Up</a></h3>
        <h3 onClick={() => { setHomeSelected(false); setLoginSelected(false); setSignUpSelected(false); setAppliancesSelected(true) }}>
          <a>Appliances</a></h3>
          { token? <div className="logout"><h3 onClick = {logOut} ><a id ='logout'>Log Out</a></h3></div>:
        <h3 onClick={() => { setHomeSelected(false); setLoginSelected(true); setSignUpSelected(false); setAppliancesSelected(false) }}>
          <a>Login</a></h3>}
      </nav>
      {/*Terinary to show details pf logged user,  logout options and  carts */}
      <>
        {
          token? <div className='logged-user'>
          <p>Welcome: {loggedUser[0].username}</p>
          <p>Cart</p>
          </div>:null
        }
      </>
      <h1> Carotta Appliances</h1>
    {/* terinary operations to select the selected pages from the nav elements*/}
      {
        homeSelected ? <>
          <h4>Welcome to Carotta Applaiances.</h4>
          <p><i>Upgrade Your Kitchen, Elevate Your Cooking!</i><br /><br />

          </p>
          <ul className='home-list'>Why Choose Us?
            <li>✅ Innovative, user-friendly designs</li>
            <li>✅ Durable, high-performance appliances</li>
            <li>✅ Affordable prices for every kitchen</li>
          </ul>
        </> : <>
        { (loginSelected)? <>
        {/* {token? <p>You are already logged</p>:<> */}
          <form onSubmit={login}>
            <h3>Login</h3>
            <input
              placeholder="username"
              onChange={(event) => { SetLoginUsername(event.taget.value) }} />
            <br /><br />
            <input
              placeholder="password"
              type="password"
              onChange={(event) => { SetLoginPassword(event.taget.value) }} /><br />
            <button>login</button>
          </form> </>
        // }
        : <>
          {signUpSelected ? <>

            <form onSubmit={signUp}>
              <h3>Sign Up</h3>
              <input
                placeholder="username"
                onChange={(event) => { setEnteredUsername(event.taget.value) }} />
              <br /><br />
              <input
                placeholder="password"
                type="password"
                onChange={(event) => { setEnteredPassword(event.taget.value) }} />
              <br />
              <button>Sign Up</button>
            </form></> :
            <>
            {appliancesSelected ?
              <>
                <ul>
                  {
                    appliancesList.map((appliance) => {
                      return (<li key={appliance.id}
                        onClick={() => getApplianceDetails(appliance.id)}
                      >{appliance.name}</li>)

                    })
                  }
                </ul>
              </> : <>
              {applianceDetails[0] ?
                <>
                {
                    <>
                    <h3>Name: {applianceDetails[0].name}</h3>
                    <h3>Price: {applianceDetails[0].price}</h3>
                    </>
                }</> : null
              }</>
            }</>       
          }</>
        }</>
      }</>
    
  )
}

export default App