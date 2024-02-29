
const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(logout => {
    location.reload();
});

ApiConnector.current(response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();

const func = () => ApiConnector.getStocks(response => {
    if(response.success) {    
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }
})
func();
setInterval(() => func, 60000);    

const monManager = new MoneyManager();

monManager.addMoneyCallback = money => ApiConnector.addMoney(money, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        monManager.setMessage(response, "Счёт пополнен");
    } else {
        monManager.setMessage(response, response.error);
    }
});
monManager.conversionMoneyCallback = money => ApiConnector.convertMoney(money, response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data);
        monManager.setMessage(response, "Конвертирование совершилось");
    } else {
        monManager.setMessage(response, response.error);
    }
})
monManager.sendMoneyCallback = money => ApiConnector.transferMoney(money, response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        monManager.setMessage(response, "Перевод совершён");
    } else {
        monManager.setMessage(response, response.error);
    }
})
const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
       if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            monManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response, "список получен");

    }
})
favoritesWidget.addUserCallback = favorite => ApiConnector.addUserToFavorites(favorite, response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        monManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response, "пользователь добавлен");
    } else {
    favoritesWidget.setMessage(response, response.error);
    }
})
favoritesWidget.removeUserCallback = remove => ApiConnector.removeUserFromFavorites(remove, response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        monManager.updateUsersList(response.data);
        favoritesWidget.setMessage(response, "пользователь удалён");
    } else {
    favoritesWidget.setMessage(respnse.e);
    }
})