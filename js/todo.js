/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var numOfTasksCreated = 0;


const createTaskButton = document.querySelector("#createTask");
createTaskButton.addEventListener("click",function(){
    if(document.querySelector("#taskName").value.trim() == "" ||
       !document.querySelector("#date").value ||
       document.querySelector("#description").value.trim() == ""){
           alert("One or more fields are empty. Please complete all fields to create new task");
           return;
       }
    numOfTasksCreated++;
  
    //creating expand image
    let imgExpand = document.createElement("img");
    imgExpand.src ="img/expand-icon.png";
    imgExpand.id = "expand-"+numOfTasksCreated;
    imgExpand.style.height="14px";
    //imgExpand.style.marginRight="45px";
    imgExpand.style.cursor="pointer";
    imgExpand.title="View task description";

    //creating delete image
    let imgDelete = document.createElement("img");
    imgDelete.src = "img/cross-icon.png";
    imgDelete.id="delete-"+numOfTasksCreated;
    imgDelete.style.height="15px";
    imgDelete.style.cursor="pointer";
    imgDelete.title="Delete task";

    //creating textnodes
    let taskName = document.createTextNode(document.querySelector("#taskName").value.trim());
    let taskDate = document.createTextNode(document.querySelector("#date").value);
    let taskDesc = document.createTextNode(document.querySelector("#description").value.trim());


    //creating spans
    let checkBox = document.createElement("input");
    checkBox.type="checkbox";
    checkBox.title="Mark task as completed";
    checkBox.id="check-"+numOfTasksCreated;
    let spanCheckBox = document.createElement("span");
    spanCheckBox.appendChild(checkBox);
    let spanTaskName = document.createElement("span");
    spanTaskName.title=taskName.data;
    spanTaskName.appendChild(taskName);
    let spanTaskDate = document.createElement("span");
    spanTaskDate.appendChild(taskDate);
    

    //creating description div
    let descDiv = document.createElement("div");
    descDiv.id="details-"+numOfTasksCreated;
    descDiv.style.display = "none";
    descDiv.style.marginLeft="17%";
    descDiv.appendChild(taskDesc);

    //creating basic details div
    let basicDetailsDiv = document.createElement("div");
    basicDetailsDiv.id="basic-"+numOfTasksCreated;
    basicDetailsDiv.className = "grid-container-task-list";
    basicDetailsDiv.appendChild(spanCheckBox);
    basicDetailsDiv.appendChild(spanTaskName);
    basicDetailsDiv.appendChild(spanTaskDate);
    basicDetailsDiv.appendChild(imgExpand);
    basicDetailsDiv.appendChild(imgDelete);

  
    document.querySelector("#taskList").appendChild(basicDetailsDiv);   
    document.querySelector("#taskList").appendChild(descDiv);   

    ResetFieldsAndHide();
})

function ResetFieldsAndHide(){
    document.querySelector("#taskName").value = "";
    document.querySelector("#date").value = "";
    document.querySelector("#description").value="";
}

const taskList = document.querySelector("#taskList");
taskList.addEventListener("click",function(event){

    if(event.target.id.includes("expand")){// if clicked on expand icon
        let taskNum = event.target.id.split("-")[1];
        document.querySelector("#details-"+taskNum).style.display = "block";
        event.target.src="img/collapse-icon.png";
        event.target.id="collapse-"+taskNum;
        return;
    }

    if(event.target.id.includes("collapse")){//if clicked on collapse icon
        let taskNum = event.target.id.split("-")[1];
        document.querySelector("#details-"+taskNum).style.display = "none";
        event.target.src="img/expand-icon.png";
        event.target.id="expand-"+taskNum;
        return;
    }

    if(event.target.id.includes("delete")){ //if clicked on delete icon
        let taskNum = event.target.id.split("-")[1];
        let taskItemBasic = document.querySelector("#basic-"+taskNum);
        let taskItemDesc = document.querySelector("#details-"+taskNum);
        let removeTask=false;
        if(document.querySelector("#check-"+taskNum).checked){
            removeTask=true;
        }
        else{
            if(confirm("This task is not complete yet. Are you sure you want to remove?")){
                removeTask = true;
            }
        }
        if(removeTask){
            taskItemBasic.parentNode.removeChild(taskItemBasic);
            taskItemDesc.parentNode.removeChild(taskItemDesc);
            numOfTasksCreated--;
        }
        return;
    }
})