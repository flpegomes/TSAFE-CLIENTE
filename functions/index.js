const functions = require('firebase-functions');
const admin     = require("firebase-admin");

// initializes your application
admin.initializeApp(functions.config().firebase);

// exports.sendPushNotification = functions.database.ref('/usuario_pedidos/{email64}/{id}/{conteudo}')
// .onCreate((snapshot, context) => {

//     //atenção: context traz as variaveis da query que estao entre chaves{}
//     return admin.database().ref(`/usuarios/${context.params.email64}`)
//     .once('value')
//     .then(snapshot => {
//         const dadosUser = snapshot.val();

//         let payload = {
//             notification: {
//                 title: "teste com usuario",
//                 body: "Mais um"
//             }
//         }

//         return admin.messaging().sendToDevice(dadosUser.pushToken, payload);
//     }).catch();
// });

//exemplo: pega token e manda pushNotification
exports.sendPushNotification = functions.database.ref('/mensagens/{emailE}/{emailR}/{pushId}/')
.onCreate((snapshot, context) => {
  // Grab the current value of what was written to the Realtime Database.
    const token2 = () => {
        console.log(context.params);
        console.log(snapshot.val());
        admin.database().ref(`/usuarios/${context.params.emailE}`)
        .once('value')
        .then(snapshot2  => {
            const pushToken = snapshot2.val().pushToken;
            console.log(`push: ${pushToken}`);
            console.log(snapshot2.val()).pushToken;
            return pushToken;
        })
        .catch(erro => console.log(`erro: ${erro}`))
    }
   // const token = 'f9beWXT3Goc:APA91bEhB_trVq627ryMPhc1IAKKTXi8CeUfE7JEECUHGHXFvv5PgCFod3UMcxAByC_FvFbGjUDK9bRUMrBHOD30f1caVSxPh8zlSGheG0AmODzQg364WT'
    const token = 'f9beWXT3Goc:APA91bEhB_trVq627ryMPhc1IAKKTXi8CeUfE7JEECUHGHXFvv5PgCFod3UMcxAByC_FvFbGjUDK9bRUMrBHOD30f1caVSxPh8zlSGheG0AmODzQg364WT'
    console.log(`token2: ${token2()}`);

    let payload = {
        notification: {
        title: "Nova mensagem",
        body: `${snapshot.val().mensagem}`
       }
    }

       return admin.messaging().sendToDevice(token, payload)
       .then((response) => {
           console.log(response);
       })
       .catch(error => {
           console.log(`deu erro : ${error}`)
       });
});


/* pega o token e da uppercase criando um atributo no mesmo nivel com o titulo de uppercase
exports.makeUppercase = functions.database.ref('/token/{pushId}/{conteudo}')
    .onCreate((snapshot, context) => {
      // Grab the current value of what was written to the Realtime Database.
      const original = snapshot.val();
      console.log('Uppercasing', context.params.conteudo, original);
      const uppercase = original.toUpperCase();
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      return snapshot.ref.parent.child('uppercase').set(uppercase);
    });
*/
/*exports.sendPushNotification = functions.database.ref('/token/{pushId}/original')
.onCreate((snapshot, context) => {
    const original = snapshot.val();
    let payload = {
        notification: {
        title: "teste aqui",
        body: "Mais um"
       }
      }
      return functions
      .firebase
      .database()
      .ref(`/token`)
      .get()
      .then(doc => {
         pushToken = doc.data().pushToken;
         // sendToDevice can also accept an array of push tokens
         return admin.messaging().sendToDevice(pushToken, payload);
      });
});*/


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
