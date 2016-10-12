
angular.module("uliApp", [])
    .controller('mainCtrl', ['$scope', function ($scope) {
        'use strict';
        $scope.legalEntityIdentifier = "";
        $scope.loanIdentifier = "";
        $scope.ULI = "";
        $scope.nULI = "";
        $scope.checksum = '';

        function getCode(charValue) {
            var value = charValue.charCodeAt(0);
            if (value >= 48 && value <= 57) {
                return charValue;
            } else if (value >= 65 && value <= 90) {
                return (value - 55).toString();
            } else
                return '';
        }

        $scope.calculateChecksum = function () {
            try {
                if( $scope.legalEntityIdentifier === '' || $scope.loanIdentifier === '')
                    return;
                    
                $scope.ULI = $scope.legalEntityIdentifier.toUpperCase() + $scope.loanIdentifier.toUpperCase();
                var ULI = $scope.ULI;
                $scope.nULI = "";

                for (var i = 0; i < ULI.length; i++) {
                    $scope.nULI += getCode(ULI[i]);
                }
                $scope.nULI += "00";
                var bigNum = new Big($scope.nULI);
                $scope.checksum = (98 - bigNum.mod(97)).toLocaleString('en-US',{minimumIntegerDigits:2,});

            } catch (error) {
                console.error(error);
            }
            return $scope.checksum;
        };
        $scope.checkULI = function () {
            try {
                var nULI = '';
                var uli = $scope.uli.toUpperCase();
                for (var i = 0; i < uli.length; i++) {
                    nULI += getCode(uli[i]);
                }
                var bigNum = new Big(nULI);
                var modResult = 1 * bigNum.mod(97).toFixed() ;
                $scope.uliStatus = modResult === 1 ? true : false;
                return;
            } catch (error) {
                console.error(error);
                $scope.uliStatus = "-";
            }
        };

        //uli
        $scope.uliStatus = "-";
        $scope.$watch('uli', function () {
            $scope.uliStatus = "-";
        });
        var onChangeGenULI = function () {
        $scope.ULI = "";
        $scope.nULI = "";
        $scope.checksum = '';
        $scope.calculateChecksum();
           
        }
        $scope.$watch('legalEntityIdentifier', onChangeGenULI);
        $scope.$watch('loanIdentifier', onChangeGenULI);
    }])
    ;