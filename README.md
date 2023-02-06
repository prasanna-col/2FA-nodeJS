# 2FA-nodeJS

In this project, I have done a 2FA with Novu and Twilio.

Teach stack
1. NodeJS has APIs for Register, Login and Code verification.
    1. Node package: "@novu/node"


First, create an account on both Novu and Twilio.

In Twilio, Create a Twilio phone number on the dashboard.
<img width="1388" alt="Ahoy prasanna , welcome to Twilio!" src="https://user-images.githubusercontent.com/98028568/216627278-7f909de0-87cf-4870-bf3a-aeb5c5608b81.png">

You will find the Twilio ph number in the account info section.
<img width="665" alt="Account Info" src="https://user-images.githubusercontent.com/98028568/216627341-ab81d704-961b-46bd-a87c-795f3bbe320b.png">

In Novu, on the integration store section, please select Twilio from the SMS block and connect with twill credentials
  1. Account SID
  2. Auth Token
  3. Twilio phone number

<img width="1380" alt="Twilio ph number" src="https://user-images.githubusercontent.com/98028568/216627418-6db9a06a-2a3e-4e6f-971d-0e48f4507de9.png">

Create a notification template.
<img width="1368" alt="Create new template" src="https://user-images.githubusercontent.com/98028568/216627475-280552f9-c6a7-4e5a-ad05-4c9617dc726c.png">

Select Workflow Editor from the side pane and create a workflow as below:
<img width="1045" alt="Workflow Editor" src="https://user-images.githubusercontent.com/98028568/216627534-a146257a-7522-4140-998e-8ffbf2d14e44.png">

Edit the SMS template and add the content as in the screenshot.                                                   
<img width="517" alt="Pasted Graphic 6" src="https://user-images.githubusercontent.com/98028568/216627566-19e0af3c-6841-4054-9e91-b81b1d5daf03.png">
<img width="1106" alt="Edit SMS Template" src="https://user-images.githubusercontent.com/98028568/216627581-88c0400b-92f3-4d01-98ef-aa2b2f75e141.png">

Copy the Novu API key from the settings section and update it on your backend code.
<img width="1179" alt="Settings" src="https://user-images.githubusercontent.com/98028568/216627629-e61afd9e-ac15-421e-8b7c-c5fe04d004d1.png">

Update the trigger id on your backend code
<img width="1321" alt="Notification Template" src="https://user-images.githubusercontent.com/98028568/216627681-6308bea4-0aac-48cd-b757-fe7f04144c48.png">



## API details:

1. Register: http://localhost:4000/api/register

	Body: {
        	email: ‘username@yopmail.com',
	        password: 'Qwer@123',
        	username: 'sourash',
	        tel: '+91822312XXXX' // your mobile number
	    }

2. Login: http://localhost:4000/api/login 
	
	Body: {
        	email: ‘username@yopmail.com',
	        password: 'Qwer@123',
      	    }

	Code will send to your mobile number when login is successful

3. Code verification API: http://localhost:4000/api/verification 
	
	Body: {
        	code: ‘7etr56rg4j6vd2’
      	    }
