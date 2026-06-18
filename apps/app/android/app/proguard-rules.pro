# 🛡️ IDENTITY FIX: Disable R8 optimization.
# Optimization often scrambles UID/Package metadata that Google Play Services uses for security checks.
# Disabling it is the most reliable fix for 'SecurityException: Unknown calling package name'.
-dontoptimize

# Add project specific ProGuard rules here.
# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.
#
# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# react-native-reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# React Native Pager View
-keep class com.reactnativepagerview.** { *; }
-keep interface com.reactnativepagerview.** { *; }
# Fabric / New Architecture Pager View internals
-keep class com.facebook.react.viewmanagers.RNCViewPagerManagerInterface { *; }
-keep class com.facebook.react.viewmanagers.RNCViewPagerManagerDelegate { *; }

# Expo Image (Glide / SDWebImage)
-keep class com.bumptech.glide.** { *; }
-keep public class * extends com.bumptech.glide.module.AppGlideModule
-keep public class * extends com.bumptech.glide.module.LibraryGlideModule
-dontwarn com.bumptech.glide.**
-keep class com.facebook.imagepipeline.datasource.* { *; }

# React Native MMKV (Crucial for App State)
-keep class com.mrousavy.mmkv.** { *; }
-keep class com.tencent.mmkv.** { *; }

# Safe Area Context
-keep class com.th3rdwave.safeareacontext.** { *; }

# Lottie
-keep class com.airbnb.lottie.** { *; }
-dontwarn com.airbnb.lottie.**

# React Native SVG
-keep class com.horcrux.svg.** { *; }

# Add any project specific keep options here:

# 📦 PAGER VIEW: Preserve native classes for swiping
-keep class com.reactnativepagerview.** { *; }

# 👆 GESTURE HANDLER: Preserve native classes for touch events
-keep class com.swmansion.gesturehandler.** { *; }

# @generated begin expo-build-properties - expo prebuild (DO NOT MODIFY)
-dontwarn no.nordicsemi.android.dfu.DfuBaseService
-dontwarn no.nordicsemi.android.dfu.DfuProgressListenerAdapter
-dontwarn no.nordicsemi.android.dfu.DfuServiceController
-dontwarn no.nordicsemi.android.dfu.DfuServiceInitiator
-dontwarn no.nordicsemi.android.dfu.DfuServiceListenerHelper
-dontwarn no.nordicsemi.android.dfu.DfuProgressListener
-dontwarn com.stripe.android.**
-keep class com.stripe.android.** { *; }
-keep class com.reactnativestripesdk.** { *; }
-keep class com.stripe.android.pushProvisioning.** { *; }
-keep class com.reactnativestripesdk.pushprovisioning.** { *; }
-keep class com.stripe.android.pushProvisioning.EphemeralKeyUpdateListener { *; }
-keep class com.stripe.android.pushProvisioning.PushProvisioningActivity$g { *; }
-keep class com.stripe.android.pushProvisioning.PushProvisioningActivityStarter$Args { *; }
-keep class com.stripe.android.pushProvisioning.PushProvisioningActivityStarter$Error { *; }
-keep class com.stripe.android.pushProvisioning.PushProvisioningActivityStarter { *; }
-keep class com.stripe.android.pushProvisioning.PushProvisioningEphemeralKeyProvider { *; }
-keepattributes *Annotation*
-keepattributes Signature
-keepattributes Exceptions
-keep class com.stripe.android.model.** { *; }
-keep class com.stripe.android.view.** { *; }
-keep class com.stripe.android.networking.** { *; }
-keep class com.stripe.android.exception.** { *; }
-keep class com.stripe.android.core.** { *; }
# @generated end expo-build-properties

# --- Project Custom Rules ---

# Firebase / Google Services
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-keep class com.google.android.gms.auth.api.signin.** { *; }
-keep class com.google.android.gms.common.api.ApiException { *; }

# Google Sign-in specifically (can be sensitive to R8)
-keep class com.reactnativegooglesignin.** { *; }

# Sentry
-keep class io.sentry.** { *; }
-dontwarn io.sentry.**

# Notifee
-keep class com.dexterous.flutterlocalnotifications.** { *; } # often referenced
-keep class io.invertase.notifee.** { *; }
-dontwarn io.invertase.notifee.**

# Kotlin Coroutines
-keepnames class kotlinx.coroutines.internal.MainDispatcherFactory {}
-keepnames class kotlinx.coroutines.CoroutineExceptionHandler {}
-keepnames class kotlinx.coroutines.android.AndroidExceptionPreHandler {}
-keepnames class kotlinx.coroutines.android.AndroidDispatcherFactory {}
-keepnames class retrofit2.KotlinExtensions$* { *; }

# OkHttp / Networking (React Native Internal)
-dontwarn okhttp3.**
-dontwarn okio.**
-dontwarn javax.annotation.**
-keepnames class okhttp3.internal.publicsuffix.PublicSuffixDatabase

# General fixes for R8 "Compilation failed"
-ignorewarnings
-keepattributes SourceFile,LineNumberTable

# Fabric / New Architecture General
-keep class com.facebook.react.viewmanagers.** { *; }
-keep class com.facebook.react.fabric.** { *; }
-keep class com.facebook.react.uimanager.** { *; }