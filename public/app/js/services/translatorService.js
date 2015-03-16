// angular.module('app').factory('translatorService', function(notifierService, translationResource, translationService){

//   var languageEs = undefined; 
// 	this.getTranslation = function(language) {
//     console.log(language);
//     translationResource.get({
//         language: language
//       },
//       function(data) {
//         languageEs = data;
//       },
//       function(error) {
//         notifierService.notifyError("Error from server: languages not found");
//       });
//   };

//   this.getTranslation('es-cr');

//   return{
//     currentLanguage: languageEs,
//     getLanguageEsCR: function(){
//       return this.currentLanguage;
//     }
//   }

// });


