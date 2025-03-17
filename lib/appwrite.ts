import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
// Add this at the beginning of your appwrite.js file to check the SDK version
import { version } from "react-native-appwrite";
console.log("Appwrite SDK Version:", version);
// ✅ Appwrite Configuration
export const config = {
  platform: "com.pkp.nestico",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

console.log("Appwrite Config:", config);

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);

interface RedirectParams {
  secret: string | null;
  userId: string | null;
}

async function handleRedirect(url: string) {
  try {
    console.log("Handling redirect URL:", url);
    const parsedUrl = new URL(url);
    const secret = parsedUrl.searchParams.get("secret");
    const userId = parsedUrl.searchParams.get("userId");

    if (!secret || !userId) {
      console.error("Missing auth parameters in redirect URL");
      return false;
    }

    console.log("User ID:", userId, "Secret:", secret);

    // Create session with the obtained credentials
    try {
      console.log("Creating session with credentials...");
      const session = await account.createSession(userId, secret);
      console.log("Session created successfully:", JSON.stringify(session));
      return session;
    } catch (sessionError) {
      const error = sessionError as any;
      console.error("Session creation error details:", 
        error.message, 
        error.code,
        error.response ? JSON.stringify(error.response) : "No response data"
      );
      
      // Check if user is already logged in
      try {
        console.log("Checking if user is already logged in...");
        const currentUser = await account.get();
        console.log("User is already logged in:", JSON.stringify(currentUser));
        return true; // Return success if user is already logged in
      } catch (userError) {
        console.error("Failed to get current user:", userError);
      }
      
      return false;
    }
  } catch (error) {
    console.error("Error handling redirect:", error);
    return false;
  }
}

// Also modify your login function to prevent duplicate listeners
export async function login() {
  try {
    // Register a listener before initiating OAuth flow
    const redirectUrl = Linking.createURL("/");
    console.log("Redirect URI:", redirectUrl);

    // Create subscription to handle the redirect
    // We'll use a variable to store the listener reference
    let listener: any = null;

    // Create a promise to handle the URL redirection
    const redirectPromise = new Promise<string | null>((resolve) => {
      listener = Linking.addEventListener("url", ({ url }) => {
        console.log("URL event received:", url);
        resolve(url);
      });
    });

    // Create OAuth session
    const authUrl = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUrl
    );

    if (!authUrl) throw new Error("OAuth token creation failed");
    console.log("OAuth URL:", authUrl);

    // Open browser for auth
    const result = await WebBrowser.openAuthSessionAsync(
      authUrl.toString(),
      redirectUrl,
      {
        showInRecents: false,
        createTask: false,
        // Use preferEphemeralSession on iOS to avoid session conflicts
        preferEphemeralSession: true,
      }
    );

    // Remove the event listener
    if (listener) {
      listener.remove();
    }

    // Handle different response types
    if (result.type === "success") {
      console.log("WebBrowser returned success:", result.url);
      return await handleRedirect(result.url);
    } else {
      // We can also check if we received a URL from the listener
      const redirectUrl = await redirectPromise;
      if (redirectUrl) {
        console.log("Redirect URL from listener:", redirectUrl);
        return await handleRedirect(redirectUrl);
      }

      console.log("WebBrowser returned:", result.type);
      throw new Error(`Authentication failed: ${result.type}`);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Login Error:", error.message);
    } else {
      console.error("Login Error:", error);
    }
    return false;
  }
}

// ✅ Logout Function
export async function logout() {
  try {
    await account.deleteSession("current");
    console.log("User logged out successfully");
    return true;
  } catch (error) {
    console.error("Logout Error:", error);
    return false;
  }
}

// ✅ Fetch Current User Data (Fixed)
export async function getCurrentUser() {
  try {
    const response = await account.get();

    if (!response || !response?.$id) {
      throw new Error("User not found");
    }

    console.log("User Data:", JSON.stringify(response));

    return {
      ...response,
      avatar: avatar.getInitials(response.name)?.toString() || "",
    };
  } catch (error) {
    if (error instanceof Error && error.message === "Already read") {
      console.log("Session exists but response was already read");
      return null;
    }
    console.error("Get Current User Error:", error);
    return null;
  }
}

// ✅ Debugging Function (Check if session exists)
export async function testAuth() {
  try {
    const session = await account.getSession("current");
    console.log("Current Session:", session);
    return session;
  } catch (error) {
    console.error("Session error:", error);
    return null;
  }
}
