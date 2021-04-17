(function () {
    app.controller('HomeInvoice', function ($scope, $http, $filter) {
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
            $scope.InvoiceCart.push({ ProductId: null, CategoryName: '', UnitPrice: 0, Quantity: 1, LineTotal: 0 });
        }
        $scope.SetValueOfProduct = function (productId) {
            var dataObj = $filter('filter')($scope.ProductList, { ProductId: parseInt(productId) })[0];
            const index = $scope.InvoiceCart.findIndex((x) => x.ProductId === productId);
            $scope.InvoiceCart[index].CategoryName = dataObj.CategoryName;
            $scope.InvoiceCart[index].UnitPrice = dataObj.SalesPrice;
            $scope.InvoiceCart[index].LineTotal = $scope.InvoiceCart[index].UnitPrice * $scope.InvoiceCart[index].Quantity;
        }
        $scope.OnChangeLineTotalSet = function (productId) {

            const index = $scope.InvoiceCart.findIndex((x) => x.ProductId === productId);

            $scope.InvoiceCart[index].LineTotal = $scope.InvoiceCart[index].UnitPrice * $scope.InvoiceCart[index].Quantity;
        }
    });
}).call(angular);