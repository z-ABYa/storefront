from django.db import models
# from playground.models import Product
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey


# Custom Manager
class TaggedItemManager(models.Manager):
    def get_tags_for(self, obj_type, obj_id):
        content_type =  ContentType.objects.get_for_model(obj_type)

        queryset = TaggedItem.objects \
            .select_related('tag') \
            .filter(
                content_type=content_type,
                object_id=obj_id
            )


class Tag(models.Model):
    label = models.CharField(max_length=255)

    def __str__(self):
        return self.label

class TaggedItem(models.Model):
    objects = TaggedItemManager() 
    # What tag is applied to which obj
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE)
    # product = models.ForeignKey(Product) <- not a good implementation as it is dependent upon playground app.

    # What we need is a generic way to identify an obj. - 
        # 1. Type (product, video, article)
        # 2. ID
    # for this we can use a abstract model like ContentType
    # So, to define a Generic rel we need 3 fields - 
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey()

