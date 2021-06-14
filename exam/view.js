class View {

    controller;
  
    setController(controller) {
      this.controller = controller;
    }
  
    // view
    searchForm() {
        return $("form", { 
          className: "search"
        }, 
        $("label", {}, 
          "от",
          $("input", { type: "text", name: "from", value: item.title }),
        ),
        $("label", {}, 
          "до",
          $("input", { type: "text", name: "to", value: item.title }),
        ),
      );
    }
    
}