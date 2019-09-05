angular.module('starter')
.service('carroService', function($http){

    var url = 'http://aluracar.herokuapp.com/';

    return{
        obterCarros: function(){
            return $http.get(url).then( (response) => {
                return response.data;
            })
        },
        salvarPedido: function(pedido){
            return $http.get(url + 'salvarpedido', pedido).then(function(response){
                return "Salvo com sucesso";
            })
        }
    }

});
