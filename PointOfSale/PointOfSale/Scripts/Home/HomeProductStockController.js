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
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'Get',
                url: "/Home/GetAllProduct",
                success: function (data) {
                    $scope.ProductList = data;
                },
                error: function () {
                    alert("Error!")
                }
            });
        }
        function GetBatchs() {
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'Get',
                url: "/Home/GetAllBatch",
                success: function (data) {
                    $scope.BatchList = data;
                },
                error: function () {
                    alert("Error!")
                }
            });
        }
        $scope.SaveProductStock = function () {
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
                        //GetAllProduct();
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
            $.ajax({
                contentType: 'application/json; charset=utf-8',
                dataType: 'json',
                type: 'Get',
                url: "/Home/GetAllProductStocks",
                success: function (data) {
                    $scope.ProductStockList = data;
                },
                error: function () {
                    alert("Error!")
                }
            });
        }
    });
}).call(angular);