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
        //alert(LocalFileSystem.PERSISTENT);
        console.log('Received Event: ' + id);
        //window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onSuccess, onError);
        console.log('loading database');
        db.initialize();
    }
};

var db = {
    initialize: function() {
        this.db = window.sqlitePlugin.openDatabase({name: "databases"});
        
        /*
        db.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
        db.executeSql('INSERT INTO test_table (id, data, data_num) VALUES (1,"a",100)');
        db.executeSql('INSERT INTO test_table (id, data, data_num) VALUES (2,"b",200)');
        db.executeSql('INSERT INTO test_table (id, data, data_num) VALUES (3,"c",300)');
        db.executeSql('INSERT INTO test_table (id, data, data_num) VALUES (4,"d",400)');
        */
        this.db.transaction(
                function (tx){ 
                    tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
                    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100]);
                    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100]);
                    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100]);
                    tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100]);
                }, 
                function(error){
                    alert("Erreur0"+error.message);
                }
        );
            
        function queryDB(tx){
                tx.executeSql("SELECT * FROM test_table", [], querySucess, errorDB);
        }

        function querySucess(tx, results){
            alert("# of rows ="+results.rows.length);
        }
        
        function errorDB(error){
            alert("Erreur - "+error.message);
        }

        this.db.transaction(queryDB, errorDB);
        
        console.log('data inserted');
        alert("data inserted ok");
        
        // Test utilisation de la caméra
        navigator.camera.getPicture(cameraSucess, cameraError, {quality: 35});
        
        function cameraSucess(imgData){
            /*
            var image = document.getElementById('camera_image');
            image.src = "data:image/jpeg;base64," + imgData;
            */
           console.log('Full image data' + imgData);
           var src = "data:image/jpeg;base64," + imgData;
           console.log('Adresse image : ' + src);
        }
        
        function cameraError(message){
            alert('Failed because '+message)
        }
    }
};