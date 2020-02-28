﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using ServiceRequest.API.Data;

namespace ServiceRequest.API.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20200220185603_Cascade")]
    partial class Cascade
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ServiceRequest.API.Models.Attachment", b =>
                {
                    b.Property<int>("AttachmentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("RequestID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("URL")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("AttachmentID");

                    b.HasIndex("RequestID");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("ServiceRequest.API.Models.Comment", b =>
                {
                    b.Property<int>("CommentID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Author")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("RequestID")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CommentID");

                    b.HasIndex("RequestID");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("ServiceRequest.API.Models.Location", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("ID");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("ServiceRequest.API.Models.Request", b =>
                {
                    b.Property<string>("RequestID")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AFE")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Acknowledged")
                        .HasColumnType("bit");

                    b.Property<bool>("Approved")
                        .HasColumnType("bit");

                    b.Property<decimal>("ApprovedBudget")
                        .HasColumnType("decimal(18,2)");

                    b.Property<DateTime?>("CoupaDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("CreatedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Deliverables")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EngineerAssigned")
                        .HasColumnType("nvarchar(max)");

                    b.Property<decimal?>("ExpectedCost")
                        .HasColumnType("decimal(18,2)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Owner")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("PromiseDate")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PropertyCode")
                        .HasColumnType("int");

                    b.Property<DateTime>("RequestDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Submitted")
                        .HasColumnType("bit");

                    b.HasKey("RequestID");

                    b.ToTable("Requests");
                });

            modelBuilder.Entity("ServiceRequest.API.Models.User", b =>
                {
                    b.Property<int>("UserID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateCreated")
                        .HasColumnType("datetime2");

                    b.Property<string>("DisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("LastLogin")
                        .HasColumnType("datetime2");

                    b.Property<int>("Role")
                        .HasColumnType("int");

                    b.Property<string>("Username")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserID");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("ServiceRequest.API.Models.Attachment", b =>
                {
                    b.HasOne("ServiceRequest.API.Models.Request", null)
                        .WithMany("Attachments")
                        .HasForeignKey("RequestID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("ServiceRequest.API.Models.Comment", b =>
                {
                    b.HasOne("ServiceRequest.API.Models.Request", "Request")
                        .WithMany("Comments")
                        .HasForeignKey("RequestID")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}