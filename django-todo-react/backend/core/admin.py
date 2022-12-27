from django.contrib import admin
from .models import CustomUser,Account,AccountManager

class CustomUserAdmin(admin.ModelAdmin):
    model = CustomUser

admin.site.register(CustomUser,CustomUserAdmin)


class AccountAdmin(admin.ModelAdmin):
    model = Account

admin.site.register(Account, AccountAdmin)

