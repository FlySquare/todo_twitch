const   tmi = require("tmi.js");
const mysql = require('mysql');
let connection5 = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_twitch'
});
const options = {
    options: {
      debug: true
    },
    connection: {
        cluster: 'aws',
      reconnect: true
    },
    identity: {
      username: "kel_bot",
      password: "oauth:s1ctua6ggq3bvlprav9mnns61uxqv3"
    },
    channels: ['flysquaree'],
  };
  // Edit channel name
  var chnl = "flysquaree";
  // Edit channel name

  const client = new tmi.client(options);
  var prefix = "!todo";
  // user["username"];
  client.connect();
  //bağlanma mesajı
client.on('connected', function (address, port) {
   client.action(chnl,'Çalışıyorum la sakin');
});

   client.on('chat', (channel, user, message, self) => {
    if(message.startsWith(prefix)){
        
        if(message.startsWith(prefix)){
          var input = message.split('!todo')[1];
          if (input.count < 2) return;
              
              var usernames = user["username"];
              var sqlSorgusu5 = `INSERT INTO todo_todo (todo_sahip,todo_icerik) VALUES ('`+usernames+`','`+input+`')`;

              
        
  
    connection5.query(sqlSorgusu5, function (error5, results, fields) {
      if (error5) throw error5;
      console.log('TODO EKLENDİ');
    });


        }
    }
});
