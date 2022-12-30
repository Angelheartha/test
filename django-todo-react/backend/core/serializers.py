from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser
from django.contrib.auth import update_session_auth_hash

from .models import Account, AccountManager




class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        token['fav_color'] = user.fav_color
        return token

class CustomUserSerializerr(TokenObtainPairSerializer):
    """
       Currently unused in preference of the below.
       """

    setSelectedFile = serializers.ImageField(max_length=30)
    email = serializers.EmailField(
        required=True
    )
    username = serializers.CharField(max_length=30)
    password = serializers.CharField(min_length=8, write_only=True)

    startDate = serializers.CharField(max_length=30)
    vals = serializers.CharField(max_length=30)
    val = serializers.CharField(max_length=30)

    class Meta:
        model = Account
        fields = ('email', 'username', 'password', "startDate", "vals", "val","setSelectedFile")
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance




class CustomUserSerializer(serializers.ModelSerializer):
    """
    Currently unused in preference of the below.
    """
    email = serializers.EmailField(
        required=True
    )
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = Account
        fields = ('email', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)  # as long as the fields are the same, we can just use this
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance