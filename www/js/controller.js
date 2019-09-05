angular.module('starter')
    .controller('listagemController', function ($scope, carroService) {

        carroService.obterCarros().then(function (dados) {
            $scope.listaDeCarros = dados;
        })

    });

angular.module('starter')
    .controller('CarroEscolhidoController', function ($stateParams, $scope) {
        $scope.carroEscolhido = angular.fromJson($stateParams.carro);

        $scope.listaAcessorios = [
            { nome: 'Freio ABS', preco: 700 },
            { nome: 'Ar condicionado', preco: 1000 },
            { nome: 'MP3 Player', preco: 400 }
        ]

        $scope.mudou = (acessorio, isMarcado) => {
            if (isMarcado) {
                $scope.carroEscolhido.preco = $scope.carroEscolhido.preco + acessorio.preco;
            } else {
                $scope.carroEscolhido.preco = $scope.carroEscolhido.preco - acessorio.preco;
            }
        }
    });

angular.module('starter')
    .controller('FinalizarController', function ($stateParams, $scope, $ionicPopup, $state, carroService) {

        $scope.carroFinalizado = angular.fromJson($stateParams.carro);

        $scope.pedido = {};

        $scope.finalizarPedido = () => {

            var pedidoFinalizado = {
                params: {
                    carro: $scope.carroFinalizado.nome,
                    preco: $scope.carroFinalizado.preco,
                    nome: $scope.pedido.nome,
                    endereco: $scope.pedido.endereco,
                    email: $scope.pedido.email
                }
            }

            carroService.salvarPedido(pedidoFinalizado).then(function (dados) {
                $ionicPopup.alert({
                    title: "Parabéns",
                    template: "Você acaba de adquirir seu carro dos sonhos!"
                })
                    .then(() => {
                        $state.go('listagem');
                    });
            },
            function(erro){
                $ionicPopup.alert({
                    title: "Erro",
                    template: "Campos obrigatórios."
                })
            })
        }
    });