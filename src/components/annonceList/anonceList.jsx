


import { List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import React , {useState,useEffect} from 'react'

const AnnonceList = () => {

  const[announcements , setannouncementData] = useState({ annonces: [] })

    useEffect(() => {
      fetchAnnouncements();
    }, []);
    
    const fetchAnnouncements = async () => {
      try {
         await axios.get('/api')
        .then(response => {
          setannouncementData({ annonces: response.data })
        })
        .catch(error => {
          console.log("api error")
        })
    
      } catch (error) {
        console.error("try catch error");
      }
    };

    announcements.annonces.sort((a, b) => new Date(b.date) - new Date(a.date));

   




  return (
    <div>

{(typeof announcements.annonces==='undefined') ? (

  <p>loading</p>
) : (
  <List>
  {announcements.annonces.map((announcement) => (
    <ListItem key={announcement.id}>
       <ListItemText
            primary={
              <>
              <div>Profile: {announcement.profile}</div>
                <div>Budget: {announcement.budget}</div>
                <div>Detail: {announcement.detail}</div>
                <div>description: {announcement.description}</div>
              </>

            }

            secondary={
              <>
                <div>Prestation: {announcement.prestation}</div>
                
              </>
            
            }
            
          />
    </ListItem>
  ))}
</List>
)}



    </div>
  )
}

export default AnnonceList

