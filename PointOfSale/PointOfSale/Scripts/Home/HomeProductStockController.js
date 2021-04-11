(function () {
    app.controller('ProductStock', function ($scope, $http) {
        $scope.ProductStock = new Object();
        var init = function () {
            GetProducts();
            GetBatchs();
            GetAllProductStock();
        }; //end of init
        init(); //init is called

        function GetProducts() {
            $http.get('/Home/GetAllProduct')
                .then(function (response) {
                    var data = response.data;
                    $scope.ProductList = data;
                });
        }
        function GetBatchs() {
            $http.get('/Home/GetAllBatch')
                .then(function (response) {
                    var data = response.data;
                    $scope.BatchList = data;
                });
        }
        $scope.SaveProductStock = function () {
            for (var i = 0; i < $scope.ProductStockList.length; i++) {
                if (($scope.ProductStock.ProductQtyId <= 0 || $scope.ProductStock.ProductQtyId == "" || $scope.ProductStock.ProductQtyId == null || $scope.ProductStock.ProductQtyId == typeof undefined) && $scope.ProductStockList[i].ProductId == $scope.ProductStock.ProductId && $scope.ProductStockList[i].BatchId == $scope.ProductStock.BatchId) {
                    alert("You can not select same product,batch again! Please change batch")
                    return false;
                }
            }
            var data = JSON.stringify({
                stock: $scope.ProductStock
            });
            return $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'POST',
                url: "/Home/SaveProductStock",
                data: data,
                success: function (result) {
                    if (result.IsSuccess == true) {
                        GetAllProductStock();
                        //Reset();
                        alert("Save Success!");
                    }
                    else {
                        alert("Save failed!");
                    }
                },
                error: function () {
                    alert("Error!")
                }
            });
        }
        function GetAllProductStock() {
            $http.get('/Home/GetAllProductStocks')
                .then(function (response) {

                    var data = response.data;
                    $scope.ProductStockList = data;
                });
        }
        $scope.SetForEdit = function (item) {
            $scope.ProductStock = item;
        }
    });
}).call(angular);