import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User as SupabaseUser, Session } from '@supabase/supabase-js';

interface Profile {
  id: string;
  nome: string;
  nicho?: string;
  como_ajuda?: string;
  plano_ativo: boolean;
}

interface User {
  id: string;
  email: string;
  name: string;
  niche?: string;
  helpDescription?: string;
  profile?: Profile;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to fetch user profile
  const fetchUserProfile = async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  // Helper function to create user object from Supabase user and profile
  const createUserObject = async (supabaseUser: SupabaseUser): Promise<User> => {
    const profile = await fetchUserProfile(supabaseUser.id);
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      name: profile?.nome || supabaseUser.email?.split('@')[0] || '',
      niche: profile?.nicho,
      helpDescription: profile?.como_ajuda,
      profile
    };
  };

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) return;
        
        // Only synchronous state updates here
        setSession(session);
        setLoading(false);
        
        // Defer profile fetching to avoid deadlocks
        if (session?.user) {
          setTimeout(() => {
            if (mounted) {
              createUserObject(session.user).then(userObject => {
                if (mounted) {
                  setUser(userObject);
                }
              }).catch(error => {
                console.error('Error creating user object:', error);
                if (mounted) {
                  setUser({
                    id: session.user.id,
                    email: session.user.email || '',
                    name: session.user.email?.split('@')[0] || '',
                  });
                }
              });
            }
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      setSession(session);
      setLoading(false);
      
      if (session?.user) {
        setTimeout(() => {
          if (mounted) {
            createUserObject(session.user).then(userObject => {
              if (mounted) {
                setUser(userObject);
              }
            }).catch(error => {
              console.error('Error creating user object:', error);
              if (mounted) {
                setUser({
                  id: session.user.id,
                  email: session.user.email || '',
                  name: session.user.email?.split('@')[0] || '',
                });
              }
            });
          }
        }, 0);
      } else {
        setUser(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setLoading(false);
        return { error: error.message };
      }

      // Log de auditoria será implementado após migração
      if (data.user) {
        console.log('Login realizado para usuário:', data.user.id);
      }

      return {};
    } catch (error) {
      setLoading(false);
      return { error: 'Erro ao fazer login' };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            nome: name
          }
        }
      });

      if (error) {
        setLoading(false);
        return { error: error.message };
      }

      // Log de auditoria será implementado após migração
      if (data.user) {
        console.log('Registro realizado para usuário:', data.user.id);
      }

      return {};
    } catch (error) {
      setLoading(false);
      return { error: 'Erro ao criar conta' };
    }
  };

  const logout = async () => {
    // Log de auditoria será implementado após migração
    if (user?.id) {
      console.log('Logout realizado para usuário:', user.id);
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      login,
      register,
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};