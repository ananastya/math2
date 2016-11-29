var app = angular.module('math', [], function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});

app.controller('taskController', function ($scope, $http, $timeout) {
    $scope.task = {
        text: '3+2',
        answer: '',
        timeStart: new Date().getTime()
    }

    console.log('$scope.task', $scope.task.text)
    $scope.getTask = function(){
        $http({
            method: 'POST',
            url: '/get_task',
            data: {random: 1}
        }).success(function(data){
            $scope.task = data
            $scope.task.timeStart =  new Date().getTime()
        })
    }
    $scope.getTask()
    $scope.sendAnswer = function () {
        $scope.task.timeEnd = new Date().getTime()
        $scope.task.user_id = $scope.userId
        $http({
            method: 'POST',
            url: '/send_task',
            data: $scope.task
        }).success(function(data){
            $scope.result = data
            if($scope.task.answer == $scope.task.right_answer){
                $scope.resultMsg = 'Правильно!'
            }
            else{
                $scope.resultMsg = 'Неправильно! ' + $scope.task.right_answer
            }
            $timeout(function(){
                $scope.resultMsg = ''
                $scope.getTask()
            }, 1000)

        })

    }


})



// /* POST task. */
// router.post('/send_task', function(req, res, next) {
//     console.log('send_task handler')
//     console.log(req)
// });