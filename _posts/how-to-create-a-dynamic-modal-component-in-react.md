---
title: "How To Create A Dynamic Modal Component In React"
description: "Our Hero scrolls casually through a webpage when suddenly everything goes dark! Feverishly, they spin the scroll wheel on their mouse but it's no use,..."
image: "/images/blog-cover/react-modal.jpg"
created_at: "01/19/2021"
tags: ["React", "JavaScript"]
canonical: "https://blog.huntertrammell.dev/how-to-create-a-dynamic-modal-component-in-react"
---


> Our Hero scrolls casually through a webpage when suddenly everything goes dark! Feverishly, they spin the scroll wheel on their mouse but it's no use, our Hero is trapped. Clicks ring through the air trying to dismiss the beast but not even the point of their cursor can penetrate the 80% opacity fog that has engulfed our Hero's webpage. Drifting closer to the center of the webpage, they discover an island brimming with text and inputs. The Hero's Heartbeat begins to slow as their gaze is affixed on the X in the top right corner, a way out of this madness. The tip of their index finger shatters their mouse as the black fog dissolves into oblivion. The modal has been slain.
 
## **Overview**
We are going to run through how to build a reusable modal component for React. Utilizing the onClick event attribute we will be able to trigger our model wherever it is needed across the app. Since we want this modal component to be reusable, we need to be able to pass content into the component via props and children so that we can customize text for each implementation. Modern UX libraries like [Bootstrap](https://getbootstrap.com/) already have these components pre-built and ready for your use, but as great as those libraries can be, sometimes you just need to create a quick component that doesn't require third party assets to render. This tutorial aims to help you better understand React concepts through the construction of a dynamic modal component. To see the completed component, take a look at this [Codepen](https://codepen.io/huntertrammell/pen/wvozBxz).
 
## **What Is A Modal?**
 
Modal refers to an element that is rendered above the main content of a webpage that the user must interact with in some form to dismiss. Using a modal in your application is a really good way to add another level of user experience to your app, while this article primarily focuses on the construction of a modal in React, if you are interested in learning more about how best to implement these from a user experience standpoint, [this is a great article](https://uxplanet.org/modality-the-one-ux-concept-you-need-to-understand-when-designing-intuitive-user-interfaces-e5e941c7acb1) that goes in depth on that subject.
 
## **Setup React Environment**
 
Before we start building we need to get our React project setup, for this i'm using React's own [documentation](https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute) to get started. I'll repeat the steps in here, but if you run into any issues in your setup I would suggest running through that section to get started as there is a lot of extra information that may be helpful in understanding the issue.
 
Create an index.html and app.js file and add the following links to the `<head>` tag of your index.html document
 
```html
<script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
<script src="app.js"></script>
```
 
We have now loaded in React's library and created a page for our functions to reside. Now, we need to tell our application where to render. Inside the `<body>` tag of your index.html file, create a div element with an id that we can use to mount our app. Your index.html file should look like this now:
```html
<!DOCTYPE html>
<html>
   <head>
       <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
       <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
       <script src="app.js"></script>
   </head>
   <body>
       <div id="app"></div>
   </body>
</html>
```
## **Creating The Modal Trigger**
 
Now that our HTML is setup, let's open the app.js file we created earlier. Here we are going to create our component and mount it to our id in the HTML file. Let's create the component that will trigger our modal. Let's start by defining our trigger
```javascript
class Toggle extends React.Component {
   render() {
       return (
           <a href="#" onClick={this.toggleModal(e)}>Click Me!</a>
       )
   }
}
//render trigger on webpage
ReactDOM.render(
 <Toggle />,
 document.getElementById('app')
);
```
 
You should see an ugly little unstyled anchor tag pop-up onto your webpage, if you're running into issues, check that the id of the element in your HTML file matches the id of the element you specified in your ReactDOM.render function. Let's create our toggleModal function, but first we need to define a state property.
```javascript
class Toggle extends React.Component {
   //set state
   state = {
       show: false
   };
   //define toggle function
   toggleModal = e => {
       //when run, this will just change the value to the opposite.
       this.setState({
           show: !this.state.show
       })
   }
   render() {
       return (
           <a href="#" onClick={this.toggleModal(e)}>Click Me!</a>
       )
   }
}
//render trigger on webpage
ReactDOM.render(
 <Toggle />,
 document.getElementById('app')
);
```
 
## **Creating the Modal**
 
Fantastic - but you may have noticed it is not doing much yet. We now need to define our modal component so that it can utilize the show property we have created.
 
```javascript
class Modal extends React.Component {
   render(){
       //if show is set to false, don't render
       if (!this.props.show) {
           return null;
       }
       return (
           <h1>Hello World</h1>
       )
   }
}
//create trigger
class Toggle extends React.Component {
   //set state
   state = {
       show: false
   };
   //define toggle function
   toggleModal = e => {
       //when run, this will just change the value to the opposite.
       this.setState({
           show: !this.state.show
       })
   }
   render() {
       return (
           <div>
               <a href="#" onClick={this.toggleModal(e)}>Click Me!</a>
               <Modal show={this.state.show}/>
           </div>
       )
   }
}
//render trigger on webpage
ReactDOM.render(
 <Toggle />,
 document.getElementById('app')
);
```
 
Now when you click our Toggle component, the H1 tag is displayed based on the current value of our show state property. This is great functionality, but we still have a bit of work to do to get it workable. Let's update our modal component and add some css!
```javascript
class Modal extends React.Component {
   render(){
       //if show is set to false, don't render
       if (!this.props.show) {
           return null;
       }
       return (
           <div class="modal=overlay">
                <div class="modal">
                    <h1>Hello World</h1>
                </div>
           </div>
       );
   }
}
```
 
Create a css file and link it with the html, this center's our modal
```css
.modal-overlay {
  height: 100vh;
  width: 100vw;
  position: fixed;
  overflow: hidden;
  z-index: 99998;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.8);
}
.modal {
  height: 200px;
  width: 400px;
  position: absolute;
  z-index: 99999;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  background-color: #fffff0;
}
```
 
*Note that you should always run your css through a prefix compiler so you can ensure compatibility with other browsers*
 
Now we just need to handle dismissing the modal. In the Toggle component let's pass the toggle function to the modal so that we have access to that state changing property
 
```javascript
class Toggle extends React.Component {
   //set state
   state = {
       show: false
   };
   //define toggle function
   toggleModal = e => {
       //when run, this will just change the value to the opposite.
       this.setState({
           show: !this.state.show
       })
   }
   render() {
       return (
           <div>
               <a href="#" onClick={this.toggleModal(e)}>Click Me!</a>
               <Modal onClose={this.toggleModal} show={this.state.show}/>
           </div>
       )
   }
}
```
 
Inside the modal component we create a function that runs when the button is clicked using the function passed down by the Toggle component.
```javascript
class Modal extends React.Component {
   //handle closing the modal based on state of parent
   onClose = e => {
       this.props.onClose && this.props.onClose(e);
   };
   render() {
       //if show is set to false, don't render
       if (!this.props.show) {
           return null;
       }
       return (
            <div class="modal=overlay">
                <div class="modal">
                    <h1>Hello World</h1>
                    <button onClick={this.onClose}>close</button>
                </div>
            </div>
       );
   }
}
```
 
Now our modal is dismissible! Let's see how we can make it dynamic
 
## **Making our Modal Dynamic**
 
Thanks to props in React, we can use our modal component as a wrapper element and pass what we need inside in order to make this reusable. Let's create where our children components will render in the Modal component first.
 
```javascript
class Modal extends React.Component {
 onClose = e => {
   this.props.onClose && this.props.onClose(e);
 };
   render() {
       //if show is set to false, don't render
       if (!this.props.show) {
           return null;
       }
       return (
            <div class="modal=overlay">
                <div class="modal">
                    <h1>{{this.props.title}}</h1>
                    <!--This allows us to use what was placed inside the Modal Component in our Toggle Component-->
                    <div>{this.props.children}</div>
                    <button onClick={this.onClose}>close</button>
                </div>
            </div>
       );
   }
}
```
 
And in our Toggle component, all we need to do is add our body inside of the Modal tag, and pass our title in as a prop:
 
```javascript
class Toggle extends React.Component {
   //set state
   state = {
       show: false
   };
   //define toggle function
   toggleModal = e => {
       //when run, this will just change the value to the opposite.
       this.setState({
           show: !this.state.show
       })
   }
   render() {
       return (
           <div>
               <a href="#" onClick={this.toggleModal}>Click Me!</a>
               <Modal onClose={this.toggleModal} show={this.state.show} title="Dynamic Modal">
                   This is the body text for the modal
               </Modal>
           </div>
       )
   }
}
```
 
That's it!
 
## **Conclusion**
 
I hope you found this tutorial helpful in explaining how we can use state and props to create a dynamic modal component for your website using React. I challenge you to add some style and further functionality to this component to make it your own. Here are a few topics that you might be interested in reading if you want to know what can be done to improve this implementation etc.
 
**propTypes**: [propTypes](https://reactjs.org/docs/typechecking-with-proptypes.html) allow you to add validation in the props that you use. For example, if we failed to pass the show or the onClose prop to our Modal component, the functionality would not work. By using propTypes, we can set that component to required so that you can't render it without those props present.
 
**Cookies**: Use [Cookies](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies) to check if the modal has already been triggered and based on that display or hide the modal from the user - this is especially helpful for modals that are triggered by a non-interactive event like session duration or scrolling.
 
**Teleportation**: Sometimes, rendering modals inside of a navigation bar or other areas of your app seems like it doesn't fit the overall structure of your HTML document. Using the [Teleportation](https://medium.com/better-programming/what-is-react-teleportation-7d9c5f6eacee) property in React you can keep your structure organized and place things where they make the most sense.
 

