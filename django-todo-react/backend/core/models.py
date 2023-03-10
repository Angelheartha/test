from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, _user_has_perm
from django.core import validators

from django.utils import timezone


class AccountManager(BaseUserManager):
    def create_user(self, request_data, **kwargs):
        now = timezone.now()
        if not request_data['email']:
            raise ValueError('Users must have an email address.')


        user = self.model(
            username=request_data['username'],
            email=self.normalize_email(request_data['email']),
            #normalize_emailで受け取ったデータがemailであるかをチェックしている
            is_active=True,
            last_login=now,
            date_joined=now,
        )

        user.set_password(request_data['password'])
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password, **extra_fields):
        request_data = {
            'username': username,
            'email': email,
            'password': password
        }

        user = self.create_user(request_data)
        user.is_active = True
        user.is_staff = True
        user.is_admin = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    username = models.CharField(('username'), max_length=30)
    first_name = models.CharField(
        ('first name'), max_length=30, blank=True)
    last_name = models.CharField(('last name'), max_length=30, blank=True)
    email = models.EmailField(
        verbose_name='email address', max_length=255, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    date_joined = models.DateTimeField(
        ('date joined'), default=timezone.now)

    setSelectedFile = models.ImageField(upload_to="image",verbose_name="file")



    objects = AccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def user_has_perm(user, perm, obj):
        return _user_has_perm(user, perm, obj)

    def has_perm(self, perm, obj=None):
        return _user_has_perm(self, perm, obj=obj)

    def has_module_perms(self, app_label):
        return self.is_admin

    def get_short_name(self):
        return self.first_name

    @property
    def is_superuser(self):
        return self.is_admin

    class Meta:
        db_table = 'auth_user'
        swappable = 'AUTH_USER_MODEL'



class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=120)
