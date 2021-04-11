(function () {
    app.controller('HomeInvoice', function ($scope, $http) {
        $scope.InvoiceCart = [];
        var init = function () {
            GetProducts();
        }; //end of init
        init(); //init is called

        function GetProducts() {
            $http.get('/Home/GetAllProduct')
                .then(function (response) {
                    var data = response.data;
                    $scope.ProductList = data;
                });
        }
        $scope.AddNewRow = function () {
            $scope.InvoiceCart.push({ ProductId: 0, CategoryName: '', UnitPrice: 0, Quantity: 1, LineTotal:0});
        }
    });
}).call(angular);