from django.db.models import F, Value


def get_filter_position_params(old_position, new_position):
    filter_position, number_of_page = [], F('number_of_page')
    if old_position < new_position:
        number_of_page -= Value(1)
        filter_position = ['number_of_page__gt', old_position, 'number_of_page__lte', new_position]
    elif old_position > new_position:
        number_of_page += Value(1)
        filter_position = ['number_of_page__lt', old_position, 'number_of_page__gte', new_position]
    return filter_position, number_of_page
