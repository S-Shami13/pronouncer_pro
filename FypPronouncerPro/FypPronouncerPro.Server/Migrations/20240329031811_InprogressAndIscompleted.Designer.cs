﻿// <auto-generated />
using FypPronouncerPro.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace FypPronouncerPro.Server.Migrations
{
    [DbContext(typeof(DataBaseContext))]
    [Migration("20240329031811_InprogressAndIscompleted")]
    partial class InprogressAndIscompleted
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("FypPronouncerPro.Server.Models.LessonsModel", b =>
                {
                    b.Property<int>("LessonId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("LessonId"));

                    b.Property<string>("FocusWords")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LessonContent")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("LessonLevel")
                        .HasColumnType("int");

                    b.Property<string>("LessonTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("LessonId");

                    b.ToTable("Lessons");
                });

            modelBuilder.Entity("FypPronouncerPro.Server.Models.MispronunciationsModel", b =>
                {
                    b.Property<int>("M_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("M_Id"));

                    b.Property<string>("LessonTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("M_How")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("M_What")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("M_Id");

                    b.ToTable("Mispronunciations");
                });

            modelBuilder.Entity("FypPronouncerPro.Server.Models.StudentsModel", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("isActive")
                        .HasColumnType("bit");

                    b.HasKey("UserId");

                    b.ToTable("Students");
                });

            modelBuilder.Entity("FypPronouncerPro.Server.Models.UserLessonsModel", b =>
                {
                    b.Property<int>("UL_Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UL_Id"));

                    b.Property<bool>("InProgress")
                        .HasColumnType("bit");

                    b.Property<bool>("IsComplited")
                        .HasColumnType("bit");

                    b.Property<string>("LessonTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UL_Id");

                    b.ToTable("UserLessons");
                });
#pragma warning restore 612, 618
        }
    }
}
