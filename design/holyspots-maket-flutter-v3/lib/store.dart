import 'models.dart';

/// Single in-memory store shared across screens. Screens mutate these lists
/// directly and call setState — no external state-management package needed.
class Store {
  Store._();
  static final Store I = Store._();

  final List<City> cities = [
    City('c6e79df0', 'Говардхан', 'Знаменит священным холмом Говардхан и 21-км парикрамой вокруг него.', 'Индия', 4, 1, 3),
    City('2eaeb5a4', 'Починки', 'Московская область', 'Россия', 0, 0, 1),
    City('d6da9ad3', 'Ангкор', 'Храмовый комплекс Ангкор-Ват, павильоны с барельефами Рамаяны.', 'Камбоджа', 3, 1, 2),
  ];

  final List<Spot> spots = [
    Spot('01e635f3', 'Ангкор-Ват. Общие факты', 'Ангкор', 'Фото', '13.4125, 103.8660', 6),
    Spot('01cb9c34', 'СЗ павильон. Рамаяна, Сита входит в огонь', 'Ангкор', 'Фото', '13.4132, 103.8659', 2),
    Spot('7c3a91e2', 'Даан-Гхати Мандир', 'Говардхан', 'Храм', '27.4964, 77.4631', 3),
    Spot('88d02b4f', 'Мукхарбинд Мандир', 'Говардхан', 'Храм', '27.5079, 77.4548', 1),
    Spot('9e11c7aa', 'Манси-Ганга', 'Говардхан', 'Кунда', '27.5061, 77.4571', 2),
    Spot('b7f5310d', 'Шри Харидев Джи Мандир', 'Говардхан', 'Храм', '27.4998, 77.4602', 0),
    Spot('a1c4e820', 'Кеши-Гхат', 'Вриндаван', 'Гхат', '27.5850, 77.7000', 4),
  ];

  final List<RouteItem> routes = [
    RouteItem('Вриндаван и Говардхан', 'Маршруты района Враджа', 0, isGroup: true),
    RouteItem('Говардхан-парикрама', '21 км вокруг холма: Даан-Гхати, Манси-Ганга…', 4),
    RouteItem('Вриндаван-парикрама', '11 км: Кеши-Гхат, Мадан-Мохан, Имлитала…', 3),
    RouteItem('Ангкор', 'Храмовый комплекс Ангкора', 0, isGroup: true),
    RouteItem('Павильоны Ангкор-Вата', 'Обход барельефов Рамаяны северо-западной галереи', 2),
  ];

  final List<MapItem> maps = [
    MapItem('Говардхан — офлайн', 'govardhan_offline.bin', '18.4 МБ', '12.07.2026'),
    MapItem('Вриндаван — офлайн', 'vrindavan_offline.bin', '22.1 МБ', '09.07.2026'),
    MapItem('Ангкор — офлайн', 'angkor_offline.bin', '15.7 МБ', '01.07.2026'),
  ];

  final List<Place> places = [
    Place('MVT Guesthouse', 'Bhaktivedanta Swami Marg, Raman Reti', 'Отель', 'Вриндаван'),
    Place('Govinda\u2019s', 'ISKCON Complex, Bhaktivedanta Swami Marg', 'Кафе', 'Вриндаван'),
    Place('Angkor Palace Resort', 'Airport Road 6, Siem Reap', 'Отель', 'Ангкор'),
  ];

  final List<Direction> directions = [
    Direction('Из Дели во Вриндаван', 'Экспресс до Матхуры (2 ч) + такси 30 мин, либо такси от IGI ~3,5 ч'),
    Direction('Из Матхуры в Говардхан', 'Автобус или тук-тук от Krishna Janmabhoomi, ~40 мин'),
    Direction('Аэропорт Сием-Реап → Ангкор', 'Тук-тук 20 мин, билетный центр Angkor Enterprise по пути'),
  ];

  final List<Review> reviews = [
    Review('19.07.2026, 08:14', 'Даан-Гхати Мандир', '😊', 'Очень благостное место, начали парикраму на рассвете.', 'anna.s@gmail.com', 'pending'),
    Review('18.07.2026, 21:40', 'Манси-Ганга', '🙂', 'Вода чистая, есть гхаты для омовения. Вечером красивое арати.', 'rahul88@mail.com', 'pending'),
    Review('17.07.2026, 12:02', 'Ангкор-Ват. Общие факты', '😊', 'Аудиогид по барельефам отличный, берите билет на рассвет.', 'm.kovaleva@ya.ru', 'approved'),
    Review('16.07.2026, 09:55', 'Мукхарбинд Мандир', '☹️', 'Очень много народу в праздник, к алтарю не подойти.', '', 'approved'),
  ];
}
