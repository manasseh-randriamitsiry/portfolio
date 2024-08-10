import 'package:get/get.dart';

class PageController extends GetxController {
  var currentPage = 0.obs;

  void setPage(int page) {
    currentPage.value = page;
  }
}
