// Name : Arin Patodia
// File: app.js
// Date : 30th march 2022

"use strict";

// let app;
// (function(app){
  let core;
  let value = false;
  ((core) =>
  {

  // Declare Function Variables here...
  //console.log("%cDeclaring Variables", "color: red;")
  let contactObject = new Contact();
  let userObject = new User();    

  /**
   * Variable initialization in this function
   *
   */
  function Start()
  {
      //ActiveLinkCallBack();
      loadHeader(document.title);
    
      loadContent(document.title, ActiveLinkCallBack(document.title));

      loadFooter();
      Main();
  }

  function ActiveLinkCallBack(name)
  {
      //let name = document.title;
                   
      if(name == "/")
      {
          name = "index";
      }

      switch(name)
      {
          case "index":
             return DisplayHomePageContent();                
          case "products":
              return DisplayProductsContent();                
          case "services":
              return DisplayServicesContent();                
          case "about":
              return DisplayAboutContent();                
          case "contact":
              return DisplayContactContent();                
          case "projects":
              return DisplayProjectsContent();                
          case "login":
              return DisplayLoginContent();                
          case "register":
              return DisplayRegisterContent();                
          case "task-list":
              return DisplayTaskList();                
          case "404":
              return display404();
          default:
              break;                
      }
  }

      /**
   * Inject the Navigation bar into the Header element and highlight the active link based on the pageName parameter
   *
   * @param {string} pageName
   */
       function loadHeader(pageName)
       {
         // inject the Header
         
         $.get("./Views/components/header.html", function(data)
         {
           $("header").html(data); // load the navigation bar
   
           toggleLogin(); // add login / logout and secure links
   
           $(`#${pageName}`).addClass("active"); // highlight active link
   
           // loop through each anchor tag in the unordered list and 
           // add an event listener / handler to allow for 
           // content injection
           $("a").on("click", function()
           { 
             $(`#${router.ActiveLink}`).removeClass("active"); // removes highlighted link
             router.ActiveLink = $(this).attr("id");
             loadContent(router.ActiveLink, ActiveLinkCallBack(router.ActiveLink));
             $(`#${router.ActiveLink}`).addClass("active"); // applies highlighted link to new page
             history.pushState({},"", router.ActiveLink); // this replaces the url displayed in the browser
           });
   
           // make it look like each nav item is an active link
           $("a").on("mouseover", function()
           {
             $(this).css('cursor', 'pointer');
           });
         });
       }
   
       /**
        * Inject page content in the main element 
        *
        * @param {string} pageName
        * @param {function} callback
        * @returns {void}
        */
       function loadContent(pageName, callback)
       {
         // inject content
         $.get(`./Views/content/${pageName}.html`, function(data)
         {
           $("main").html(data);
   
           callback();
         });
         
       }
   
       function loadFooter()
       {
         // inject the Footer
         $.get("./Views/components/footer.html", function(data)
         {
           $("footer").html(data);
         });
       }




    function  DisplayHomePageContent()
   {
      document.getElementById("home").className = "nav-item active";

      document.title = "WEBD6201 - Home";

      let taskListButton = $("#taskListButton").click(function(){
          location.href = "./task-list.html";
      });
   }

  /**
   * This function injects content into the targetElement's container
   * 
   * The pageName parameter is optional.
   * The async parameter has a default setting of true and is optional
   *
   * @param {string} targetElement
   * @param {string} filePath
   * @param {function} [callback]
   * @param {string} [pageName]
   * @param {boolean} [async=true]
   * @returns {void}
   */
  function LoadPageContent(targetElement, filePath, callback, pageName, async=true)
  {
      let container = document.getElementById(targetElement);

      // Step 1 - wrap everything in a try / catch
      try {
          // Step 2 - instantiate an XHR object
          let XHR = new XMLHttpRequest();

          // Step 3 - attach an event listener
          XHR.addEventListener("readystatechange", function(){
           if((XHR.readyState === 4) && (XHR.status === 200))
           {
               // Step 6 - do something with the data
               let content =  XHR.responseText;

               container.innerHTML = content;

              if(pageName)
              {
                  document.getElementById(pageName).className = "nav-item active";
              }

              if(callback)
              {
                  callback();
              }
              
           }

          });

          // Step 4. - code your request
          XHR.open("GET",filePath, async);

          // Step 5 - send the request to the server
          XHR.send();

      } catch (error) {
          
      }
  }


  function DisplayHomePageContent()
  {
      document.title = "WEBD6201 - Home";
     

     LoadPageContent("mainContent", "./Views/content/home.html");

     LoadPageContent("mainFooter","./Views/partials/footer.html");
     
  }
 

  function DisplayServicesContent()
  {
      document.title = "WEBD6201 - Services";

  }

  function DisplayAboutContent()
  {
      document.title = "WEBD6201 - About Us";
  }

  function DisplayContactContent()
  {
      document.title = "WEBD6201 - Contact Us";
     
  }

  function DisplayProjectsContent()
  {
      document.title = "WEBD6201 - Projects";
  }

  function DisplayLoginContent()
  {
      document.title = "WEBD6201 - Login";

      $("#loginForm").submit  ((e)=>
      {
         
        //Prevents default behaviour when the form is submitted
        e.preventDefault();
          
        let userName = $('#contactName').val();  
        let password = $('#password').val();  
        if(userName  && password)
        {
             //heading element
             $('#username_label').text(userName)
             $('#username_label').show();
             
             location.replace("task-list.html");
             //location.href = "task-list.html";
             value = true;
             DisplayTaskList();
             
        }else{
            alert("Please enter the details!!");
        }

      });

  }

  function DisplayRegisterContent()
  {
      document.title = "WEBD6201 - Register";
  }

  
  
  function DisplayTaskList()
  {

      document.title = "WEBD6201 - Task List";

      // don't allow visitors to go here
      authGuard();
      $(".editTextInput").hide();
      // When clicks on add button
      $("#newTaskButton").on("click", function(){

          AddNewTask();   
          $("#taskTextInput").trigger("reset");                               
      });

      // When clicks on edit button
      $("ul").on("click", ".editButton", function(){   

         let editText = $(this).parent().parent().children(".editTextInput");
         let text = $(this).parent().parent().text();
         editText.val(text);
         editText.show();
         editText.select();
         editText.keypress(function(event){
          if(event.keyCode == "13")
          {
              editText.hide();
              $(this).parent().children("#taskText").text(editText.val());               
          }
         });
      });

      // When clicks on delete button
      $("ul").on("click", ".deleteButton", function(){
          if(confirm("Are you sure?"))
          {
              $(this).closest("li").remove();
          }    
      });
  }
 
  function AddNewTask(){
  
      let inputText = $("#taskTextInput").val();

          if(inputText == "" ){
               document.getElementById("errorMessage").innerHTML = "Please enter the task!!";                
          }else{
              $("#errorMessage").hide();                
              let newElement = 
              `
              <li class="list-group-item" id="task">
              <span id="taskText">${inputText}</span>
              <span class="float-right">
                  <button class="btn btn-outline-primary btn-sm editButton"><i class="fas fa-edit"></i>
                  <button class="btn btn-outline-danger btn-sm deleteButton"><i class="fas fa-trash-alt"></i></button>
              </span>
              <input  type="text" class="form-control edit-task editTextInput">                
              </li>
              `            
              
              $("#taskList").append(newElement); 
              $(".editTextInput").hide();
              //$("#taskTextInput")[0].reset();
              //document.getElementById("#taskTextInput").reset();
              
          }
         
  
  } 

  class Contact {
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "") {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
  }
  
  class User
  {
    constructor(FirstName = "", lastName = "", emailAddress = "", password = "", confirmPassword = "")
    {
        this.FirstName = FirstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
  }

  function authGuard()
  {
    if(!sessionStorage.getItem("user"))
    {
    // redirect  to login page
    if(value == false){
      //location.replace("login.html");
      DisplayLoginContent();
      }
      }
  }

  function display404()
  {
      alert("Page Not Found");
  }

  window.addEventListener("load", Start);
  core.Start = Start;
  
})(core || (core = {}));



  function toggleLogin()
  {
    // if user is logged in
    if(sessionStorage.getItem("user"))
    {
      // swap  the login for logout
      $("#loginListItem").html(
      `<a id="logout" class="nav-link" aria-current="page"><i class="fas fa-sign-out-alt"></i> Logout</a>`
      );

      $("#logout").on("click", function()
      {
        // perform logout
        sessionStorage.clear();

        // redirect  to login
        location.href = "/views/content/login.html";
      });

      // make it look like each nav item is an active link
      $("#logout").on("mouseover", function()
      {
        $(this).css('cursor', 'pointer');
      });
     
      $(`<li class="nav-item">
      <a id="contact-list" class="nav-link" aria-current="page"><i class="fas fa-users fa-lg"></i> Contact List</a>
    </li>`).insertBefore("#loginListItem");
    }
    else
    {
      // swap the login for logout
      $("#loginListItem").html(
        `<a id="login" class="nav-link" aria-current="page"><i class="fas fa-sign-in-alt"></i> Login</a>`
        );
    }
  }

 