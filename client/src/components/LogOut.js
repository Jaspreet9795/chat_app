import React, {useState} from 'react'
import { MenuItem} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

export default function LogOut ({ updateUser }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState([])
 

//   function refreshPage() {
//     window.location.reload();
//   }



  function handleLogOut (e) {
    e.preventDefault();
    fetch('/logout', {
      method: 'DELETE'
    }).then(r => {
        // updateUser(false)
      if (r.ok) {
        updateUser(false)
        navigate("/")

      } else {
        r.json().then(json => setErrors(json.errors))
      }
    })
  }

  return (
    <>
      <MenuItem onClick={handleLogOut}>LogOut</MenuItem>
    </>
  )
}
