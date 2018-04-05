const ItemController = (function () {

    //Constructor
    const Item = function (id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    const data = {
        items: [
         /*    { id: 0, name: "Steak Dinner", calories: 1200 },
            { id: 1, name: "Whey Protein", calories: 100 },
            { id: 2, name: "Eggs", calories: 400 } */
        ],
        currentItem: null,
        totalCalories: 0
    }

    return {
        getItems: function () {
            return data.items;
        },
        addItem: function (name, calories) {
            let id = 0;
            if (data.items.length > 0){
                id = data.items[data.items.length - 1].id + 1;
            }
            
            const newItem = new Item(id, name, calories);
            data.items.push(newItem);
            UIController.addListItem(newItem);
        },
        logData: function () {
            return data;
        }
    }

})();

const UIController = (function () {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories'
    }

    return {
        populateItemList: function (items) {
            let html = '';
            items.forEach(item => {
                html += `<li id="item-${item.id}" class="collection-item">
                    <strong>${item.name}: </strong>
                    <em>"${item.calories}"</em>
                    <a href="" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`
            });

            document.querySelector(UISelectors.itemList).innerHTML = html;
        },

        getItemInput: function () {
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },

        addListItem: function (item) {

            const li = document.createElement("li");
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `<strong>${item.name}: </strong>
            <em>"${item.calories}"</em>
            <a href="" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
            </a>`

            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);

            UIController.clearInputs();
        },

        clearInputs: function(){
            document.querySelector(UISelectors.itemNameInput).value='';
            document.querySelector(UISelectors.itemCaloriesInput).value='';
        },

        getSelectors: function () {
            return UISelectors;
        }
    }

})();

const App = (function (ItemController, UIController) {

    const loadEventListeners = function () {
        const UISelectors = UIController.getSelectors();

        //add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit)
    }

    const itemAddSubmit = function (e) {
        const input = UIController.getItemInput();

        if (input.name !== '' && input.calories !== '') {
            ItemController.addItem(input.name, input.calories);
        }

        e.preventDefault();
    }

    return {
        init: function init() {
            const items = ItemController.getItems();

            UIController.populateItemList(items);

            loadEventListeners();
        }
    }

})(ItemController, UIController);

App.init();