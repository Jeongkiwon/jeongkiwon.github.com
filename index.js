jQuery(function($) {
    // 변수는 항상 함수나 클래스 서두에 선언하고, 전역변수가 되지 않도록 주의
    var $x = {},// jquery 객체는 $를 붙여서 식별하면 혼란방지
        f = {}, // 내부함수는 f 그룹으로 관리
        x = {}; // 일반변수는 x 그룹으로 관리
  
    // jquery 객체는 동적으로 사용하지 않는한 최대한 미리 셋팅
    // *셀렉트를 포함해 jquery동작은 자원을 많이 쓰므로 중복방지용
    $x.list_items = $("ul.bbsgroup_lst > li");
    $x.mn_items = $("ul.bbsgroup_lst > li > span:first-child");
    $x.mn_marks = $("ul.bbsgroup_lst > li > span.mark");
    $x.mn_curr_page = $("div.paging_wrap strong.page_num");
    $x.mn_total_pages = $("div.paging_wrap span.page_total");
    $x.mn_prev_page = $("div.btn_prev");
    $x.mn_next_page = $("div.btn_next");
    $x.tab_panes = $("div.tab-pane");
  
    // 내부함수에서 공통으로 사용할 일반변수(jquery객체가 아닌 변수) 셋팅
    x.mn_display = 6;
    x.mn_count = $x.mn_items.length;
    x.total_pages = x.mn_count / x.mn_display;
    x.curr_page = 1; // 1부터 시작하는 시퀀스
    x.curr_idx = 0; // 0부터 시작하는 시퀀스, 메뉴와 타겟이 1대1로 매칭된다는 가정하에 사용할 인덱스
  
    // 그러고나서 내부함수들을 만들어 $x 그룹과 x 그룹을 이용해 기능 구현
    f.show_pane = function() {
    $x.tab_panes.hide(); // 전체 노드를 감추고
    $x.tab_panes.eq(x.curr_idx).show(); // 필요한 노드만 보여주는데
    // 1. 이런식으로 하는 것은 HTML 안에 노드를 미리 모두 포함시켜 관리하는 거고
    // 2. 또 다른 방식은 필요한 노드만 HTML안에 시작시 넣어놓고
    // 동적으로 노드를 넣고 빼는 방법을 쓸 수도 있음 (자원이 더 많이 듬)
    };
    f.show_mark = function() {
    $x.mn_marks.hide();
    $x.mn_marks.eq(x.curr_idx).show();
    };
    f.do_paging = function(moving) {
    var tmp_page = x.curr_page + moving;
    // 페이지를 전체 페이지 범위안에 있도록 교정
    if (tmp_page > x.total_pages) {
    x.curr_page = 1;
    } else if (tmp_page < 1) {
    x.curr_page = x.total_pages;
    } else {
    x.curr_page = tmp_page;
    }
    // 확정된 페이지 숫자를 표시
    $x.mn_curr_page.text(x.curr_page);
    // 확정된 페이지의 첫 노드를 표시하기 위해 계산
    x.curr_idx = (x.curr_page - 1) * x.mn_display;
    // 전체노드를 숨기고, 보여줄 노드만 페이지상 표시갯수에 맞춰 표시
    $x.list_items.hide();
    for (var idx = x.curr_idx; idx < x.curr_idx + x.mn_display; idx++) {
    $x.list_items.eq(idx).show();
    }
    // 마크와 타겟을 표시
    f.show_mark();
    f.show_pane();
  
    // * 일단 원본코드를 참조하여 정리했지만 페이징은
    // * jquery의 slide 기능을 연구해서 구현해야 자연스러움
    };
  
    // 변수와 내부함수 셋팅이 끝나면 HTML 노드에 필요한 이벤트를 바인딩
    $x.mn_prev_page.on("click", function() {
    f.do_paging(-1);
    });
    $x.mn_next_page.on("click", function() {
    f.do_paging(+1);
    });
    $x.mn_items.on("click", function(e) {
    // 함수 내의 변수를 항상 첫머리에 선언
    // jquery 객체이므로 $을 붙여서 $t로 변수명 할당
    var $t = $(e.target);
    // 메뉴 아이템들을 순환하면서 클릭된 노드의 인덱스를 알아냄
    $x.mn_items.each(function(idx, item) {
    // 클릭되서 넘어온 노드를 비교하는 방법은 상황에 따라 천차만별이나
    // 여기서는 클래스 속성 전체를 비교하는 방법으로 체크
    if ($t.attr("class") === $(item).attr("class")) {
    // 인덱스를 알아내서 변경하고
    x.curr_idx = idx;
    // 마크와 타겟을 바꿈
    f.show_mark();
    f.show_pane();
    return false; // 생략해도 무관하지만 false를 리턴하면 순환이 멈춤
    }
    });
    });
  
    // 위의 모든 것의 작성이 끝나면 초기화할 것들을 초기화
    f.do_paging(0); //기본값이 1 이므로 페이지 moving을 0 으로 넘겨줌
    $x.mn_total_pages.text(x.total_pages);
  });