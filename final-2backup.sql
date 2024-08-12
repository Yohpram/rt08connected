PGDMP                      |            final-2    16.0    16.0 2    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    33308    final-2    DATABASE     �   CREATE DATABASE "final-2" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "final-2";
                postgres    false            �            1259    33309    iuran    TABLE     �   CREATE TABLE public.iuran (
    id integer NOT NULL,
    metode_pembayaran character varying,
    produk_id integer,
    user_id integer,
    bulan_bayar character varying,
    bukti_bayar character varying
);
    DROP TABLE public.iuran;
       public         heap    postgres    false            �            1259    33314    order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.order_id_seq;
       public          postgres    false    215            �           0    0    order_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.order_id_seq OWNED BY public.iuran.id;
          public          postgres    false    216            �            1259    33452    pesan    TABLE     �   CREATE TABLE public.pesan (
    id integer NOT NULL,
    user_id integer NOT NULL,
    pesan text NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    file character varying
);
    DROP TABLE public.pesan;
       public         heap    postgres    false            �            1259    33451    pesan_id_seq    SEQUENCE     �   CREATE SEQUENCE public.pesan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.pesan_id_seq;
       public          postgres    false    224            �           0    0    pesan_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.pesan_id_seq OWNED BY public.pesan.id;
          public          postgres    false    223            �            1259    33315    tabel    TABLE     �   CREATE TABLE public.tabel (
    id integer NOT NULL,
    nama character varying,
    harga integer,
    keterangan character varying,
    image character varying
);
    DROP TABLE public.tabel;
       public         heap    postgres    false            �            1259    33320    produk_id_seq    SEQUENCE     �   CREATE SEQUENCE public.produk_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.produk_id_seq;
       public          postgres    false    217            �           0    0    produk_id_seq    SEQUENCE OWNED BY     >   ALTER SEQUENCE public.produk_id_seq OWNED BY public.tabel.id;
          public          postgres    false    218            �            1259    33321    reviews    TABLE     �   CREATE TABLE public.reviews (
    id integer NOT NULL,
    produk_id integer,
    review character varying,
    user_id integer,
    created_at timestamp without time zone
);
    DROP TABLE public.reviews;
       public         heap    postgres    false            �            1259    33326    review_id_seq    SEQUENCE     �   CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.review_id_seq;
       public          postgres    false    219            �           0    0    review_id_seq    SEQUENCE OWNED BY     @   ALTER SEQUENCE public.review_id_seq OWNED BY public.reviews.id;
          public          postgres    false    220            �            1259    33503    suket_id_seq    SEQUENCE     u   CREATE SEQUENCE public.suket_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.suket_id_seq;
       public          postgres    false            �            1259    33525    suket    TABLE     �  CREATE TABLE public.suket (
    id integer DEFAULT nextval('public.suket_id_seq'::regclass) NOT NULL,
    nik character varying(20) NOT NULL,
    nama character varying(100) NOT NULL,
    tempat_lahir character varying(100) NOT NULL,
    tanggal_lahir date NOT NULL,
    alamat text NOT NULL,
    agama character varying(25) NOT NULL,
    gender character varying(25) NOT NULL,
    keperluan text NOT NULL,
    user_id integer,
    created_at timestamp with time zone DEFAULT now()
);
    DROP TABLE public.suket;
       public         heap    postgres    false    225            �            1259    33327    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    nik character varying,
    alamat character varying,
    no_telp character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    33332    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    221            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    222            3           2604    33333    iuran id    DEFAULT     d   ALTER TABLE ONLY public.iuran ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);
 7   ALTER TABLE public.iuran ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            7           2604    33455    pesan id    DEFAULT     d   ALTER TABLE ONLY public.pesan ALTER COLUMN id SET DEFAULT nextval('public.pesan_id_seq'::regclass);
 7   ALTER TABLE public.pesan ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    223    224            5           2604    33335 
   reviews id    DEFAULT     g   ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);
 9   ALTER TABLE public.reviews ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219            4           2604    33334    tabel id    DEFAULT     e   ALTER TABLE ONLY public.tabel ALTER COLUMN id SET DEFAULT nextval('public.produk_id_seq'::regclass);
 7   ALTER TABLE public.tabel ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            6           2604    33336    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221            �          0    33309    iuran 
   TABLE DATA           d   COPY public.iuran (id, metode_pembayaran, produk_id, user_id, bulan_bayar, bukti_bayar) FROM stdin;
    public          postgres    false    215   S7       �          0    33452    pesan 
   TABLE DATA           E   COPY public.pesan (id, user_id, pesan, created_at, file) FROM stdin;
    public          postgres    false    224   	8       �          0    33321    reviews 
   TABLE DATA           M   COPY public.reviews (id, produk_id, review, user_id, created_at) FROM stdin;
    public          postgres    false    219   b:       �          0    33525    suket 
   TABLE DATA           �   COPY public.suket (id, nik, nama, tempat_lahir, tanggal_lahir, alamat, agama, gender, keperluan, user_id, created_at) FROM stdin;
    public          postgres    false    226   :       �          0    33315    tabel 
   TABLE DATA           C   COPY public.tabel (id, nama, harga, keterangan, image) FROM stdin;
    public          postgres    false    217   �;       �          0    33327    users 
   TABLE DATA           T   COPY public.users (id, username, email, password, nik, alamat, no_telp) FROM stdin;
    public          postgres    false    221   <       �           0    0    order_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.order_id_seq', 189, true);
          public          postgres    false    216            �           0    0    pesan_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.pesan_id_seq', 21, true);
          public          postgres    false    223            �           0    0    produk_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.produk_id_seq', 36, true);
          public          postgres    false    218            �           0    0    review_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.review_id_seq', 96, true);
          public          postgres    false    220            �           0    0    suket_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.suket_id_seq', 8, true);
          public          postgres    false    225            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 74, true);
          public          postgres    false    222            <           2606    33338    iuran order_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.iuran
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.iuran DROP CONSTRAINT order_pkey;
       public            postgres    false    215            F           2606    33460    pesan pesan_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.pesan
    ADD CONSTRAINT pesan_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.pesan DROP CONSTRAINT pesan_pkey;
       public            postgres    false    224            >           2606    33340    tabel produk_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.tabel
    ADD CONSTRAINT produk_pkey PRIMARY KEY (id);
 ;   ALTER TABLE ONLY public.tabel DROP CONSTRAINT produk_pkey;
       public            postgres    false    217            @           2606    33342    reviews review_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);
 =   ALTER TABLE ONLY public.reviews DROP CONSTRAINT review_pkey;
       public            postgres    false    219            H           2606    33533    suket suket_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.suket
    ADD CONSTRAINT suket_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.suket DROP CONSTRAINT suket_pkey;
       public            postgres    false    226            B           2606    33344    users users_email 
   CONSTRAINT     M   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email UNIQUE (email);
 ;   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email;
       public            postgres    false    221            D           2606    33346    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    221            I           2606    33347    iuran order_produk_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.iuran
    ADD CONSTRAINT order_produk_id_fkey FOREIGN KEY (produk_id) REFERENCES public.tabel(id);
 D   ALTER TABLE ONLY public.iuran DROP CONSTRAINT order_produk_id_fkey;
       public          postgres    false    215    217    4670            J           2606    33352    iuran order_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.iuran
    ADD CONSTRAINT order_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 B   ALTER TABLE ONLY public.iuran DROP CONSTRAINT order_user_id_fkey;
       public          postgres    false    221    215    4676            K           2606    33357    reviews review_produk_id_fkey    FK CONSTRAINT     ~   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT review_produk_id_fkey FOREIGN KEY (produk_id) REFERENCES public.tabel(id);
 G   ALTER TABLE ONLY public.reviews DROP CONSTRAINT review_produk_id_fkey;
       public          postgres    false    217    219    4670            L           2606    33362    reviews review_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT review_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) NOT VALID;
 E   ALTER TABLE ONLY public.reviews DROP CONSTRAINT review_user_id_fkey;
       public          postgres    false    221    219    4676            M           2606    33534    suket suket_user_id_fkey    FK CONSTRAINT     w   ALTER TABLE ONLY public.suket
    ADD CONSTRAINT suket_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);
 B   ALTER TABLE ONLY public.suket DROP CONSTRAINT suket_user_id_fkey;
       public          postgres    false    4676    226    221            �   �   x���;�0k�� ���2 AE%��L@�e'�"�!�-�̬ �֮�������c��{��v޿.���du�ݝ	�JiM�њ"����?���.+PW�-��V۸�~)��H��3\Tڻ��O�a���͓�2���7��͔�)�i�hK�fé��?�ia      �   I  x���Ko�@�����y5�}��DUUBH�*�	�iG���3N�sA����ovv�Yʺ�.# [B(Ą1�6zz![\�tFR��($r�	:����KO�������j�nN,a19P܈������(��!�M6oY�x?��������X���~�n��n��@��_)�/�o�2��f�ܿ�!C�5�hD?g�@��E��O�uq����]}t��,hj�����@����9��02ϝ � �\N��s'&�d����!>��(�	�ql�X:�]7e]�Ct�G����ɑ!!��yy���l^v���*%��"ю�O]�&�>.�E���1���ۦk�e�����!G�/i�z-�(�:
�z�������_����WS\����G]-�;m$���盫���퇛����!�0���:u�tDt3jA�����z��nO����]?�E�߭����p�Qi��hCgfa`ͷ��۪+���C�骶l��{b�>�a�1�����6Q��b�w�
��]}kW=t���G_]�Ħ{��v��܆ No�J>��0��ԃEJ��Us� ]��Ʃ���@�(�]Ņ���7�.S�      �      x������ � �      �     x���=k�0�Y�ދ����t�ڱk�.*1��1!������F6��$��+�
y	��t�j�ަK�H���6$���c���n��I��K{:OiP�v̻>�/c	"y�س�'��
��e8L��ҧc��ӂX�T �F-�_S ��c���G$m	�qF�yݚ0��� $:�)�f&�#Qӟ��uY�#��`�������߄�$��ߝ49�3�E�o!Et��_�P {?�m"�Fr��8�x)�]WU�Mǲ      �   j   x�36��,-J�Sp*�I�K��44 N����̢���L���ܤ��D�"�
A!
��9��)�11��Ff����%@�ŉ�%��y
��z�I\1z\\\ QH$&      �   \  x�m�Ɏ�0���)8���췆��,4��D#���Ąe���ӏ��F��X�o[��r��|��C�*LJ!i*���(�4�)��e"�G�E�[@�X���(���T��(��u5��q���
 �UFظ����,,��v���	$�4M�ݐ9�>=����<% ��G�LZ���
��ܛ�)�=QXBw����a\T��j�<F��,���k��p���o���"7�^[���sW�����@�\읓T��ĉ�N+4.W�8�m5FGH��M޴�����o�"��ah:��;�����6���Y��m(xsd.�Y��XI@��/�/�0�n�>���nQ���H�/Ra�"�ӊ�}F��&^3�ǯw$:�����.HÐ
�U�6_������7m�����25-˟,��UU8]���<��)+�ڎ�AW�s�eNj����ʡ�H3u'Z1�)�Wѭ����`F�M��
c��]��E/�iS��y�zÅu�H��D�Q4߹�mS���b�I䮻��4�w�Z��y��l3�S|x�i�����@2D?�T��\�]���M���.{�wY��S�g��yfM�ݬ�����~���U     