function AddToPriceList() 
{
	var itemName = $('#price-list-updater').find('input[name="item-name"]').val();
	var itemValueTemp = $('#price-list-updater').find('input[name="item-value"]').val();

	var isMatch = false;

	$('#price-list-table').find('tbody')
		.children().each(function() {
			if(itemName == $(this).find('td.price-item-name').text() && itemValueTemp + " \u20BD" == $(this).find('td.price-item-value').text())
			{
				isMatch = true;
			}
		});

	if(itemName != "" && itemValueTemp != "" && $.isNumeric(itemValueTemp) && isMatch == false) {
		$('#price-list-table').find('tbody')
			.append($('<tr>')
				.append($('<td>')
					.text(itemName)
					.addClass('price-item-name')
					)
				.append($('<td>')
					.text(itemValueTemp + " " + "\u20BD")
					.addClass('price-item-value')
					)
				);

			$('#price-list-updater').find('input[name="item-name"]').val("");
			$('#price-list-updater').find('input[name="item-value"]').val("");
	} else {
		alert('Введите корректные значения в поля!');
	}
}

$(document).ready(function() 
{
	$('#price-list-table').find('tbody')
		.on("mouseenter", "tr", function() {
			$(this).addClass('bg-primary');
		})
		.on("mouseleave", "tr", function() {
			$(this).removeClass('bg-primary');
		})
		.on("click", "tr", function() {
			AddToCart($(this));
		});

	$(document)
		.on("click", ".delete-button", function() {
			RemoveFromCart(this);
		})
});		

function AddToCart(row)
{
	var itemRowName = row.find('td.price-item-name').text();
	var itemRowValue = row.find('td.price-item-value').text();

	var isMatch = false;

	$('#price-list-cart').find('tbody')
		.children().each(function() {
			if(itemRowName == $(this).find('td.price-cart-name').text() && itemRowValue == $(this).find('td.price-cart-value').text())
			{
				var cell = $(this).find('td.price-cart-quantity');
				var quantity = cell.text();
				quantity++;
				cell.text(quantity);

				isMatch = true;
			}
		})
	if(isMatch == false) {
		$('#price-list-cart').find('tbody')
		.append($('<tr>')
			.append($('<td>')
				.text(itemRowName)
				.addClass('price-cart-name')
				)
			.append($('<td>')
				.text(itemRowValue)
				.addClass('price-cart-value')
				)
			.append($('<td>')
				.text(1)
				.addClass('price-cart-quantity')
				)
			.append($('<td>')
				.append($('<span>'))
					.text('Удалить')
					.addClass('btn')
					.addClass('btn-danger')
					.addClass('delete-button')
				)
			);
	}

	
}

function RemoveFromCart(node)
{
	var tr = node.parentElement;
	node.parentElement.parentElement.removeChild(tr);
}


function CalculateSum()
{
	var sum = 0;
	var count = 0;

	$('#price-list-cart').find('tbody')
		.children('tr').each(function() {
			count = $(this).find('td.price-cart-quantity').text();
			sum += parseInt($(this).find('td.price-cart-value').text(), 10) * count;
		});

	alert('Сумма заказа составила: ' + sum + '\u20BD');
}


function ClearCart()
{
	$('#price-list-cart').find('tbody').empty();
}