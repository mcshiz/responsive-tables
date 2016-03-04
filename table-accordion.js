/**
 * Created by brian on 3/26/15.
 */


jQuery(window).on('resize load', function () {
    $width = $(window).width();
    if ($width >= 768) {
        $.each($('table.table-accordion'), function () {
            $(this).find('td').removeAttr('style');
        })
    }
});


function initTableAccordion() {

    accordionTables = document.querySelectorAll("table.table-accordion");
    var productPageTable = null;
    $.each(accordionTables, function (index, value) {
         productPageTable = $(accordionTables[index]).parent().parent().hasClass('product-information');
        var tr = accordionTables[index].tHead.children[0],
            newTh = document.createElement('TH');
        newTh.innerHTML = "Link";
        newTh.className = "hiddenTableHeader";
        tr.insertBefore(newTh, accordionTables[index].tHead.children[0].children[1]);

        var headertext = [],
            headers = accordionTables[index].querySelectorAll(".table-accordion th"),
            tablerows = accordionTables[index].querySelectorAll(".table-accordion thead "),
            tablebody = accordionTables[index].querySelector(".table-accordion tbody");

        for (var i = 0; i < headers.length; i++) {
            var current = headers[i];
            var currentText = "" + current.textContent;
            headertext.push(currentText.replace(/\r?\n|\r/, ""));
        }

        for (var i = 0, row; row = tablebody.rows[i]; i++) {

            //if the row is a product-row give it expanding abilities
            var tablebodyClassList = "" + tablebody.rows[i].cells[0].className;
            if (typeof(tablebody.rows[i].classList) !== "undefined" && (" " + tablebody.rows[i].className + " ").replace(/[\n\t]/g, " ").indexOf(" product-row ") > -1) {

                var headerRow = tablebody.rows[i],
                    dupe = tablebody.rows[i].cells[0].cloneNode(true),
                    ref = tablebody.rows[i].cells[1];
                dupe.className = "hiddenTableHeader";
                headerRow.insertBefore(dupe, ref);

                for (var j = 0, col; col = row.cells[j]; j++) {
                    col.setAttribute("data-th", headertext[j]);
                    if (i >= 0 && j == 0) {
                        var node = document.createElement("B");
                         if (i == 0 && productPageTable === true) {
                            node.className = "accordion-arrow glyphicon glyphicon-minus ";
                        } else {
                            node.className = "accordion-arrow glyphicon glyphicon-plus";
                        }
                        col.appendChild(node);
                    }
                    if (i === 0 && j === 0) {
                        if(productPageTable === true) {
                            col.setAttribute("data-collapsed", 'false'); //set initial row as open for mobile only on product pages - bm 3/2/16
                        } else {
                            col.setAttribute("data-collapsed", 'true'); //set initial row as collapsed for mobile - SQ 2/12/16
                        }
                    } else if (i >= 1 && j === 0) {
                        col.setAttribute("data-collapsed", 'true');
                    } else if (i >= 0 && j > 0 ) { //initial row content collapsed
                        if (!productPageTable) col.className = col.className + " collapsed";
                    }
                }
            }
        }

    });
    $('table.table-accordion tr > td:first-child').on('click touch', function (e) {
        $this = $(this);
        if ($(window).width() < 768) {
            e.preventDefault();
            if ($this.attr('data-collapsed') == "true") {
                $this.attr("data-collapsed", 'false');
                $this.siblings('td').removeClass('collapsed').hide().slideDown(250);
            } else {
                $this.attr("data-collapsed", 'true');
                $this.siblings('td').stop().slideUp(250);
            }
            $this.find('b.accordion-arrow').toggleClass('glyphicon-minus');
            $this.find('b.accordion-arrow').toggleClass('glyphicon-plus');
        } else {
            //
        }
    });
}
