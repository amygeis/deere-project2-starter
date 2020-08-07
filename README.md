# Project Overview


## Project Description

Application to track medications for each person along with when medications should be taken.

## Project Links

- ![github repo](https://github.com/amygeis/deere-project2-starter "GitHub Repo")
- ![deployment](https://medtrac.herokuapp.com/ "Heroku Application")

## Wireframes

Upload images of wireframe to cloudinary and add the link here with a description of the specific wireframe.

- ![wireframes](Wireframe.pdf "WireFrame")
- ![DB architecture](database.pdf "DB architecture")



Define the the React components and the architectural design of your app.

### MVP/PostMVP - 5min

The functionality will then be divided into two separate lists: MPV and PostMVP.  Carefully decided what is placed into your MVP as the client will expect this functionality to be implemented upon project completion.  

#### MVP
- As a user I would like a list of my medications so I know what I am taking and how much.
- As a user I would like to know when to take medications so that I am taking medication at the right times of day.
- As a user I do not want other people to access my list of medications for privacy.
- As a user I would like to be able to add a new medication to the list if it is not already listed.
- As a user I would like to be a able to delete medications from my list that I am no longer taking.
- As a user I would like to be abel to edit the frequency in which I take medication.
- As a user I would like to be automatically signed out after 30 min in case I forget to log out.
- As a user I would like the ability to log out of the application.

#### PostMVP

- As a user I would like to connect to an API to get medication names
- As a user I would like a picture of the medication so that I know what my medication looks like

## Components



## Code Snippet

I had to do some interesting things because of a triple table join to get the medication name when sorting throught the medication list for a user.

```
<a href="/medicine/<%=userMeds[i].medId%>">
                        <%=medicines.find(medicine=>medid===medicine.id).name%>:<%=medicines.find(medicine=>medid===medicine.id).dosage%></a>
                        <input type="submit" value="DELETE"/>
```

## Issues and Resolutions
- Trying to get a count of medications per user per day

**ERROR**: UnhandledPromiseRejectionWarning: SequelizeDatabaseError: column "medid" does not exist                            
**RESOLUTION**: 
```
changed order: sequelize.literal('medId')
to: order: ['medId']
```

- Trying to insert data into a table with triple joins

**ERROR**: data not inserting into table                          
**RESOLUTION**: 
```
//ADD NEW USER MED TO SCHEDULE
router.put("/schedule/:id", (req,res) => {
  console.log(req.body)
  UserMed.create({
    userId: req.params.id,
    timeId: req.body.time,
    medId: req.body.medicine,  
  }).then(()=>{
      res.redirect(`/users/schedule/${req.params.id}`)
    })
  })
  ```